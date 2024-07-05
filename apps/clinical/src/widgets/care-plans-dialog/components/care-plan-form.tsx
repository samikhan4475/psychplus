import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Box, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CarePlan, STATUSES, TYPES } from '@psychplus/care-plans'
import {
  createCarePlan,
  updateCareplan,
} from '@psychplus/care-plans/api.client'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import { FormContainer, FormFieldLabel } from '@psychplus/ui/form'
import { TextArea } from '@psychplus/ui/text-area'
import { useToast } from '@psychplus/ui/toast-provider'
import { CarePlanSearchDropdown } from '.'
import { useStore } from '../../care-plans/store'

const schema = z.object({
  planType: validate.anyString,
  activeStatus: validate.anyString,
  planStartDate: validate.anyString,
  planEndDate: validate.anyString,
  planode: validate.anyString,
  notes: validate.anyString,
  planCodesetUsed: validate.anyString,
  planCode: validate.anyString,
  recordStatus: validate.anyString,
  status: validate.anyString,
  type: validate.nullOrBoolean,
  planCodeDescription: validate.anyString,
})

export type SchemaType = z.infer<typeof schema>

type ProblemFormProps = {
  data?: CarePlan
  isEdit?: boolean
  closeDialog: () => void
}

const CarePlanForm: React.FC<ProblemFormProps> = ({
  data,
  isEdit,
  closeDialog,
}) => {
  const { patientId, noteId, care_plans, setcarePlans } = useStore()

  const { toast } = useToast()

  const DATE_FORMATE = 'yyyy-MM-dd'
  const toggleGroupItemClasses =
    'font-bold text-3 data-[state=on]:bg-[#dce8ff] data-[state=on]:font-regular'

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      planCode: data?.planCode || '',
      planCodeDescription: data?.planCodeDescription || '',
      planType: data?.planType || '',
      activeStatus: data?.activeStatus || '',
      planCodesetUsed: data?.planCodesetUsed || 'ICD',
      notes: data?.notes || '',
      planStartDate: data?.planStartDate
        ? format(new Date(data?.planStartDate), DATE_FORMATE)
        : format(new Date(), DATE_FORMATE),
      planEndDate: data?.planEndDate
        ? format(new Date(data?.planEndDate), DATE_FORMATE)
        : '',
    },
  })

  const onSubmit = async () => {
    const formData = form.getValues()

    const payload = {
      ...formData,
      patientId: patientId,
      recordStatus: 'Active',
      ...(isEdit && { id: data?.id }),
      noteId: noteId,
    }

    try {
      if (isEdit) {
        const res = await updateCareplan(payload, data?.id, patientId)
        const updatedProblems = care_plans.map((care_plan: { id?: string }) =>
          care_plan.id === data?.id ? res : care_plan,
        )

        setcarePlans(updatedProblems as CarePlan[])
        closeDialog()
        toast({ type: 'success', title: 'Updated' })
      } else {
        const res = await createCarePlan({
          payload: payload,
          patientId: patientId,
        })

        setcarePlans([...care_plans, res])
        closeDialog()
        toast({ type: 'success', title: 'Created' })
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({ type: 'error', title: 'An unknown error occurred' })
      }
    }
  }

  return (
    <Toast.Provider>
      <ToggleGroup.Root
        type="single"
        defaultValue={data?.planCodesetUsed || 'ICD'}
        className=" w-[203px] rounded-t-4 border border-gray-7"
        onValueChange={(value) => {
          form.setValue('planCodesetUsed', value)
          form.setValue('planCode', '')
          form.setValue('planCodeDescription', '')
        }}
      >
        <Flex className="flex-wrap">
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

      <CarePlanSearchDropdown form={form} />

      <FormContainer onSubmit={onSubmit} form={form}>
        <Box className="mt-4 grid grid-cols-6 gap-4 font-light">
          <Box className="col-span-1">
            <FormTextInput
              readOnly
              label={'Code'}
              {...form.register('planCode')}
            />
          </Box>
          <Box className="col-span-5">
            <FormTextInput
              readOnly
              label={'Description'}
              {...form.register('planCodeDescription')}
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              type="date"
              max="9999-12-31"
              label="Start Date"
              value={
                form.watch('planStartDate') ?? format(new Date(), DATE_FORMATE)
              }
              data-testid="expiration-date"
              {...form.register('planStartDate')}
              className="mr-4"
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              type="date"
              label="End Date"
              max="9999-12-31"
              value={form.watch('planEndDate')}
              data-testid="expiration-date"
              {...form.register('planEndDate')}
              className="mr-4"
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              label="Type"
              data-testid="problem-type"
              placeholder="Select"
              {...form.register('planType')}
              options={TYPES}
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
        </Box>
        <FormFieldLabel id="notes">Notes</FormFieldLabel>
        <TextArea
          size="3"
          id="notes"
          placeholder="Start typing here"
          {...form.register('notes')}
        />
        <Box className="mt-9 flex justify-end">
          <FormSubmitButton
            className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
            onClick={onSubmit}
          >
            {isEdit ? 'Update' : 'Save'}
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

export { CarePlanForm }
