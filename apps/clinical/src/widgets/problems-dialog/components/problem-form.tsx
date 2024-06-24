import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Box, Flex, Text } from '@radix-ui/themes'
import { format, setMinutes } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import {
  CHRONICITIES,
  Problem,
  SEVERITIES,
  STATUSES,
} from '@psychplus/problems'
import { createProblem, updateProblem } from '@psychplus/problems/api.client'
import { FormContainer, FormFieldLabel } from '@psychplus/ui/form'
import { TextArea } from '@psychplus/ui/text-area'
import { useToast } from '@psychplus/ui/toast-provider'
import { IcdSnomedSearchDropdown } from '.'
import {
  findOptions,
  flattenProblems,
  formatDateTime,
  TIMES,
} from '../../problems-list/components/utils'
import { useStore } from '../../problems-list/store'

const schema = z.object({
  problemDate: validate.anyString,
  problemTime: validate.anyString,
  symptomCode: validate.anyString,
  symptomCodesetUsed: validate.anyString,
  chronicity: validate.anyString,
  severity: validate.anyString,
  activeStatus: validate.anyString,
  comments: validate.anyString,
  problemType: validate.anyString,
  symptomCodeDescription: validate.anyString,
  isPrimary: validate.nullOrBoolean,
})

export type SchemaType = z.infer<typeof schema>

type ProblemFormProps = {
  data?: Problem
  isEdit?: boolean
  closeDialog: () => void
}

const ProblemForm: React.FC<ProblemFormProps> = ({
  data,
  isEdit,
  closeDialog,
}) => {
  const DATE_FORMATE = 'yyyy-MM-dd'
  const { realCodeSets, patientId, noteId } = useStore()

  const { toast } = useToast()
  const { problems, setProblems } = useStore()

  const toggleGroupItemClasses =
    'font-bold text-3 data-[state=on]:bg-[#dce8ff] data-[state=on]:font-regular'

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      symptomCode: data?.symptomCode ?? '',
      symptomCodeDescription: data?.symptomCodeDescription ?? '',
      chronicity: data?.chronicity ?? '',
      severity: data?.severity ?? '',
      activeStatus: data?.activeStatus ?? '',
      comments: data?.comments ?? '',
      problemType: data?.problemType ?? '',
      symptomCodesetUsed: data?.symptomCodesetUsed ?? 'ICD',
      isPrimary: isEdit ? data?.isPrimary ?? false : false,
      problemTime: data?.problemDate
        ? format(new Date(data?.problemDate), 'hh:mm a')
        : format(setMinutes(new Date(), 0), 'hh:mm a'),
      problemDate: data?.problemDate
        ? format(new Date(data?.problemDate), DATE_FORMATE)
        : format(new Date(), DATE_FORMATE),
    },
  })

  const onSubmit = async () => {
    const formData = form.getValues()

    const formattedProblemDateTime = formatDateTime(
      formData.problemDate,
      formData.problemTime,
    )

    const payload = {
      ...formData,
      patientId: patientId,
      problemDate: formattedProblemDateTime,
      ...(isEdit && { id: data?.id }),
      noteId: noteId,
      isPrimary: Boolean(formData.isPrimary),
    }

    isEdit
      ? updateProblem(payload)
          .then((res) => {
            const updatedProblems = problems.map((problem: { id?: string }) =>
              problem.id === data?.id ? res : problem,
            )

            setProblems(flattenProblems(updatedProblems))
            closeDialog()
            toast({ type: 'success', title: 'Updated' })
          })
          .catch((err: Error) => {
            toast({ type: 'error', title: err.message })
          })
      : createProblem(payload)
          .then((res) => {
            setProblems([...problems, res])
            closeDialog()
            toast({ type: 'success', title: 'Created' })
          })
          .catch((err: Error) => {
            toast({ type: 'error', title: err.message })
          })
  }

  return (
    <Toast.Provider>
      <ToggleGroup.Root
        type="single"
        defaultValue={data?.symptomCodesetUsed || 'ICD'}
        className=" w-[203px] rounded-t-4 border border-gray-7"
        onValueChange={(value) => {
          form.setValue('symptomCodesetUsed', value)
          form.setValue('symptomCode', '')
          form.setValue('symptomCodeDescription', '')
        }}
      >
        <Flex>
          <ToggleGroup.Item
            value="ICD"
            className={
              toggleGroupItemClasses + ' h-[40px] w-[100px] rounded-tl-4'
            }
          >
            <Text>ICD</Text>
          </ToggleGroup.Item>
          <Box className="border-r border-gray-7"></Box>
          <ToggleGroup.Item
            value="Snomed"
            className={
              toggleGroupItemClasses + ' h-[40px] w-[100px] rounded-tr-4'
            }
          >
            <Text>Snomed</Text>
          </ToggleGroup.Item>
        </Flex>
      </ToggleGroup.Root>

      <IcdSnomedSearchDropdown form={form} />

      <FormContainer onSubmit={onSubmit} form={form}>
        <Box className="mt-4 grid grid-cols-6 gap-4 font-light">
          <Box className="col-span-1">
            <FormTextInput
              readOnly
              label={'Code'}
              value={form.watch('symptomCode')}
              {...form.register('symptomCode')}
            />
          </Box>
          <Box className="col-span-5">
            <FormTextInput
              readOnly
              label={'Description'}
              value={form.watch('symptomCodeDescription')}
              {...form.register('symptomCodeDescription')}
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              type="date"
              label="Date"
              max="9999-12-31"
              value={
                form.watch('problemDate') ?? format(new Date(), DATE_FORMATE)
              }
              data-testid="expiration-date"
              {...form.register('problemDate')}
              className="mr-4"
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              label="Time"
              data-testid="problem-time"
              placeholder="Select"
              value={
                form.watch('problemTime') ??
                format(setMinutes(new Date(), 0), 'hh:mm a')
              }
              {...form.register('problemTime')}
              options={TIMES}
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              label="Type"
              data-testid="problem-type"
              placeholder="Select"
              {...form.register('problemType')}
              options={findOptions('PHVS_ProblemType_HITSP', realCodeSets[0])}
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              label="Status"
              data-testid="active-status"
              placeholder="Select"
              {...form.register('activeStatus')}
              options={STATUSES}
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              label="Chronicity"
              data-testid="chronicity"
              placeholder="Select"
              {...form.register('chronicity')}
              options={CHRONICITIES}
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              label="Severity"
              data-testid="severity"
              placeholder="Select"
              {...form.register('severity')}
              options={SEVERITIES}
            />
          </Box>
        </Box>
        <FormFieldLabel id="notes">Notes</FormFieldLabel>
        <TextArea size="2" id="notes" {...form.register('comments')} />
        <Flex gap="2">
          <input
            type="checkbox"
            data-testid="isprimary-checkbox"
            checked={Boolean(form.watch('isPrimary'))}
            {...form.register('isPrimary')}
          />
          <Text htmlFor="isprimary-checkbox" size="2" weight="regular">
            Is Primary
          </Text>
        </Flex>
        <Box className="mt-9 flex justify-end">
          <FormSubmitButton className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
            {isEdit ? 'Update' : 'Save'}
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

export { ProblemForm }
