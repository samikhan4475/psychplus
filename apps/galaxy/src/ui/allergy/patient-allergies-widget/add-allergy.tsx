'use client'

import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { AllergyAccordion } from './allergy-accordion'
import { AllergySaveButton } from './allergy-save-button'
import { AllergySignButton } from './allergy-sign-button'
import { SearchAllergy } from './search-allergy'

const dateValidation = z.custom<DateValue | null>()

const schema = z.object({
  allergyType: z.array(z.string()).optional(),
  severity: z.array(z.string()).optional(),
  reaction: z.array(z.string()).optional(),
  status: z.array(z.string()).optional(),
  startDate: dateValidation,
  endDate: dateValidation,
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  notes: z.string().optional(),
})

type AddAllergySchemaType = z.infer<typeof schema>
const AddAllergy = () => {
  const pathname = usePathname()
  const form = useForm<AddAllergySchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      allergyType: [],
      severity: [],
      reaction: [],
      status: [],
      startDate: undefined,
      endDate: undefined,
      startTime: '',
      endTime: '',
      notes: '',
    },
  })

  const isPatientAllergiesTab = pathname.includes('quicknotes')

  return (
    <FormContainer form={form} onSubmit={() => {}}>
      <Flex direction="column" gap="1">
        <SearchAllergy />
        <AllergyAccordion title="penicillAMINE" />
        <AllergyAccordion title="Allergy to Substance, Alcohol" />
        <AllergyAccordion title="Allergy to Substance, Alcohol" />
        <Flex className="mt-5" justify="end" gap="2">
          {!isPatientAllergiesTab ? (
            <AllergySaveButton />
          ) : (
            <>
              <AllergySaveButton
                isPatientAllergiesTab={isPatientAllergiesTab}
              />
              <AllergySignButton />
            </>
          )}
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { AddAllergy, type AddAllergySchemaType }
