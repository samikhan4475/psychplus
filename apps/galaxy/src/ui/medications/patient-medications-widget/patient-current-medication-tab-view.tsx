import { zodResolver } from '@hookform/resolvers/zod'
import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { CheckboxCell, FormContainer } from '@/components'
import { FavoriteView } from './favourite-view'
import { MedicationAccordion } from './medication-accordion'
import { MedicationSaveButton } from './patient-medication-save-button'
import { MedicationSignButton } from './patient-medication-sign-button'
import { ReasonField } from './reason-field'
import { SearchFavorite } from './search-favourite'

const dateValidation = z.custom<DateValue | null>()

const schema = z.object({
  doseStrength: z.string(),
  doseUnit: z.array(z.string()).min(1),
  drugForm: z.array(z.string()).min(1),
  duration: z.array(z.string()).min(1),
  durationUnit: z.array(z.string()).min(1),
  route: z.array(z.string()).min(1),
  frequency: z.array(z.string()).min(1),
  prnReason: z.array(z.string()).min(1),
  quantity: z.array(z.string()).min(1),
  refill: z.array(z.string()).min(1),
  status: z.array(z.string()).min(1),
  startDate: dateValidation,
  endDate: dateValidation,
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  prescriber: z.array(z.string()).min(1),
  pharmacy: z.array(z.string()).min(1),
  substitution: z.array(z.string()).min(1),
  instructionOrNotes: z.string().min(1),
})

type AddMedicationSchemaType = z.infer<typeof schema>
const PatientCurrentMedicationTabView = () => {
  const form = useForm<AddMedicationSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      doseStrength: '',
      doseUnit: [],
      drugForm: [],
      duration: [],
      durationUnit: [],
      route: [],
      frequency: [],
      prnReason: [],
      quantity: [],
      refill: [],
      status: [],
      startDate: undefined,
      endDate: undefined,
      startTime: '',
      endTime: '',
      prescriber: [],
      pharmacy: [],
      substitution: [],
      instructionOrNotes: '',
    },
  })
  return (
    <FormContainer form={form} onSubmit={() => {}}>
      <Flex className="bg-whiteA-12" gap="2">
        <Flex width="70%" direction="column" className="mt-2">
          <SearchFavorite />
          <Accordion.Root type="multiple" className="mt-1">
            <Accordion.Item value="item-1" className="rounded-2">
              <Accordion.Header className="border-pp-table-border rounded-2 border p-1">
                <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left">
                  <Flex className="w-full">
                    <Flex className="w-[65%]" gap="3" align="center">
                      <TriangleDownIcon className="h-6 w-6" />
                      <Text size="2">Drug Interactions Found (5)</Text>
                      <CheckboxCell
                        label="Override All"
                        checked={false}
                        onCheckedChange={() => {}}
                      />
                    </Flex>
                    <Flex className="w-[35%]">
                      <ReasonField />
                    </Flex>
                  </Flex>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <MedicationAccordion />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Flex>
        <Flex width="40%" direction="column" className="mt-2">
          <FavoriteView />
        </Flex>
      </Flex>
      <Flex className="mt-5 w-full" justify="end" gap="2">
        <MedicationSaveButton />
        <MedicationSignButton />
      </Flex>
    </FormContainer>
  )
}

export { PatientCurrentMedicationTabView, type AddMedicationSchemaType }
