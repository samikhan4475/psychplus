import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Box, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import {
  FunctionalCognitive,
  HISTORYTYPES,
  STATUSES,
} from '@psychplus/functional-cognitive'
import {
  createFunctionalCognitives,
  updateFunctionalCognitive,
} from '@psychplus/functional-cognitive/api.client'
import { FormContainer, FormFieldLabel } from '@psychplus/ui/form'
import { TextArea } from '@psychplus/ui/text-area'
import { useToast } from '@psychplus/ui/toast-provider'
import { FunctionalCognitiveSearchDropdown } from '.'
import { useStore } from '../../functional-cognitive-list/store'

const schema = z.object({
  effectiveDate: validate.anyString,
  symptomCode: validate.anyString,
  historyType: validate.anyString,
  activeStatus: validate.anyString,
  notes: validate.anyString,
  symptomCodeDescription: validate.anyString,
  symptomCodesetUsed: validate.anyString,
})

export type SchemaType = z.infer<typeof schema>

type FunctionalCognitiveFormProps = {
  data?: FunctionalCognitive
  isEdit?: boolean
  closeDialog: () => void
}

const FunctionalCognitiveForm: React.FC<FunctionalCognitiveFormProps> = ({
  data,
  isEdit,
  closeDialog,
}) => {
  const { patientId, noteId } = useStore()

  const { toast } = useToast()
  const { functionalcognitives, setFunctionalCognitives } = useStore()

  const DATE_FORMATE = 'yyyy-MM-dd'
  const toggleGroupItemClasses =
    'font-bold text-3 data-[state=on]:bg-[#dce8ff] data-[state=on]:font-regular'

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      symptomCode: data?.symptomCode || '',
      symptomCodeDescription: data?.symptomCodeDescription || '',
      activeStatus: data?.activeStatus || '',
      notes: data?.notes || '',
      historyType: data?.historyType || '',
      symptomCodesetUsed: data?.symptomCodesetUsed || 'ICD',
      effectiveDate: data?.effectiveDate
        ? format(new Date(data?.effectiveDate), DATE_FORMATE)
        : format(new Date(), DATE_FORMATE),
    },
  })

  const onSubmit = async () => {
    const formData = form.getValues()

    const payload = {
      ...formData,
      patientId: patientId,
      ...(isEdit && { id: data?.id }),
      noteId: noteId,
    }

    const api_url = isEdit
      ? updateFunctionalCognitive
      : createFunctionalCognitives
    try {
      const res = await api_url(payload)

      const updateFunctionalCognitive: FunctionalCognitive[] =
        functionalcognitives.map((functionalcognitive) => {
          return functionalcognitive.id === data?.id ? res : functionalcognitive
        })

      isEdit
        ? setFunctionalCognitives(updateFunctionalCognitive)
        : setFunctionalCognitives([...functionalcognitives, res])

      toast({ type: 'success', title: isEdit ? 'Updated' : 'Created' })
      closeDialog()
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        console.error('An unknown error occurred:', err)
      }
    }
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
            value="SnoMed"
            className={
              toggleGroupItemClasses + ' h-[40px] w-[100px] rounded-tr-4'
            }
          >
            <Text>Snomed</Text>
          </ToggleGroup.Item>
        </Flex>
      </ToggleGroup.Root>

      <FunctionalCognitiveSearchDropdown form={form} />

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
                form.watch('effectiveDate') ?? format(new Date(), DATE_FORMATE)
              }
              data-testid="expiration-date"
              {...form.register('effectiveDate')}
              className="mr-4"
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              label="History Type"
              data-testid="history-type"
              placeholder="Select"
              {...form.register('historyType')}
              options={HISTORYTYPES}
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
          <FormSubmitButton className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
            {isEdit ? 'Update' : 'Save'}
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

export { FunctionalCognitiveForm }
