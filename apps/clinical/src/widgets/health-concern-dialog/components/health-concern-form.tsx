import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { format, setMinutes } from 'date-fns'
import { useToast } from 'node_modules/@psychplus/ui/src/toast-provider'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormSelect, FormSubmitButton, FormTextInput } from '@psychplus/form'
import {
  HealthProblem,
  IcdCodes,
  type HealthConcern,
} from '@psychplus/health-concerns'
import {
  createHealthConcern,
  deleteHealthObservations,
  getIcdCodes,
  getSnomedCodes,
  updateHealthConcern,
} from '@psychplus/health-concerns/api.client'
import { FormContainer, FormFieldLabel } from '@psychplus/ui/form'
import { TextArea } from '@psychplus/ui/text-area'
import { useStore as healthConcernListStore } from '@/widgets/health-concern-list/store'
import {
  AddConcernsTable,
  AddProblemDialog,
  cleanPayload,
  mapPayload,
  schema,
  SchemaType,
  setFormDefaultValues,
} from '.'
import { useStore as healthConcernDialogStore } from '../store'
import { HealthConcernSearchDropdown } from './health-concern-dropdown'
import { formatDateTime, TIMES, transformSnomedData } from './utils'

type ProblemFormProps = {
  data?: any
  isEdit?: boolean
  closeDialog: () => void
}

const HealthConcernForm: React.FC<ProblemFormProps> = ({
  data,
  isEdit,
  closeDialog,
}) => {
  const router = useRouter()
  const [healthProblems, setHealthProblems] = useState<HealthProblem[]>(
    data?.patientHealthObservations || [],
  )

  const handleRemoveRow = (row: Row<HealthProblem>) => {
    const updatedData = [...healthProblems]
    const index = updatedData.findIndex((item) => item.id === row.original.id)

    if (index !== -1) {
      if (isEdit) {
        deleteHealthObservations({ id: row.original.id, patientId })
      }
      updatedData.splice(index, 1)
      setHealthProblems(updatedData)
    }
  }

  const { patientId, noteId } = healthConcernDialogStore()
  const { healthConcerns, setHealthConcerns } = healthConcernListStore()

  const { toast } = useToast()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: setFormDefaultValues(data),
  })

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    const formData = form.getValues()

    const formattedDateTime = formatDateTime(
      formData.healthConcernDate,
      formData.healthConcernTime,
    )

    const senitizeFormData = {
      ...formData,
      healthConcernDate: formattedDateTime,
    }

    const payload = mapPayload(
      senitizeFormData,
      patientId,
      noteId,
      healthProblems,
      isEdit,
      data?.id,
    )

    const cleanedPayload = cleanPayload(payload)

    if (isEdit) {
      cleanedPayload['id'] = data?.id
    }

    const apiCall = isEdit ? updateHealthConcern : createHealthConcern

    try {
      const res = await apiCall(cleanedPayload)

      let updatedhealthConcerns: HealthConcern[] = []
      if (isEdit) {
        updatedhealthConcerns = healthConcerns.map((concern) =>
          concern.id === data?.id ? res : concern,
        )
      } else {
        updatedhealthConcerns = [...healthConcerns, res]
      }

      setHealthConcerns(updatedhealthConcerns)
      closeDialog()
      toast({
        type: 'success',
        title: `Record ${isEdit ? 'updated' : 'created'} successfully`,
      })
    } catch (err) {
      closeDialog()
      if (err instanceof Error) {
        toast({
          type: 'error',
          title: err.message,
        })
      } else {
        toast({
          type: 'error',
          title: 'An unknown error occurred',
        })
      }
    }

    router.refresh()
  }

  const toggleGroupItemClasses =
    'font-regular text-3 data-[state=on]:bg-[#dce8ff] data-[state=on]:font-bold'

  const clearIcdCodeFilters = () => {
    form.resetField('symptomCode')
    form.resetField('symptomCodeDescription')
  }

  const fetchIcdCodeResults = async (input: string) => {
    const code = form.getValues('symptomCodesetUsed')
    if (code === 'ICD') {
      const res = await getIcdCodes({ codeOrDescription: input })

      return res
    } else {
      const qury_params = Number(input)
        ? `codeStartsWith=${input}`
        : `codeDisplayNameContains=${input}`

      const res = await getSnomedCodes({ codeOrDescription: qury_params })
      return transformSnomedData(res.codes)
    }
  }

  const onChangeIcdCode = (icdCode: IcdCodes) => {
    form.setValue('symptomCode', icdCode.code)
    form.setValue('symptomCodeDescription', icdCode.description)
  }

  return (
    <>
      <ToggleGroup.Root
        type="single"
        defaultValue={data?.symptomCodesetUsed || 'ICD'}
        className=" w-[203px] rounded-t-4 border-x border-t border-[#C8D6FF]"
        onValueChange={(value: string) => {
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
          <Box className="border-r border-[#C8D6FF]"></Box>
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

      <HealthConcernSearchDropdown
        onChange={onChangeIcdCode}
        fetchResults={fetchIcdCodeResults}
        clearFilters={clearIcdCodeFilters}
      />

      <FormContainer onSubmit={onSubmit} form={form}>
        <Flex className="font-light" gap="2" mt="4">
          <Flex gap="2" className="flex-1">
            <Box className="flex-1">
              <FormTextInput
                type="date"
                label="Date"
                max="9999-12-31"
                value={form.watch('healthConcernDate')}
                data-testid="expiration-date"
                {...form.register('healthConcernDate')}
                className="mr-4"
              />
            </Box>
            <Box className="flex-1">
              <FormSelect
                label="Time"
                data-testid="problem-time"
                placeholder="Select"
                value={
                  form.watch('healthConcernTime') ??
                  format(setMinutes(new Date(), 0), 'hh:mm a')
                }
                {...form.register('healthConcernTime')}
                options={TIMES}
              />
            </Box>
          </Flex>
          <Flex gap="2" className="flex-1">
            <Box className="w-1/3">
              <FormTextInput label={'Code'} {...form.register('symptomCode')} />
            </Box>
            <Box className="flex-1">
              <FormTextInput
                label={'Description'}
                {...form.register('symptomCodeDescription')}
              />
            </Box>
          </Flex>
        </Flex>
        <FormFieldLabel id="notes">Notes</FormFieldLabel>
        <TextArea size="3" id="notes" {...form.register('notes')} />
        <Flex align="center" gap="2">
          <Text size="8" className="font-bold">
            Add Concern
          </Text>
          <AddProblemDialog setHealthProblems={setHealthProblems} />
        </Flex>

        <AddConcernsTable
          data={healthProblems}
          handelRemoveRow={handleRemoveRow}
        />

        <Box className="mt-9 flex justify-end">
          <FormSubmitButton className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
            {isEdit ? 'Update' : 'Save'}
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </>
  )
}

export { HealthConcernForm }
