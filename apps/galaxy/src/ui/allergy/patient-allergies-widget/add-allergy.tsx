'use client'

import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone } from '@internationalized/date'
import { Box, Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { useStore } from '@/store'
import { mapToUTCString } from '@/ui/notes/create-note/utils'
import { createAllergy } from './actions'
import { AllergyAccordion } from './allergy-accordion'
import { AllergySaveButton } from './allergy-save-button'
import { AllergySignButton } from './allergy-sign-button'
import { AddAllergySchemaType, schema } from './schema'
import { SearchAllergy } from './search-allergy'

interface AddAllergyProps {
  patientId: string
  appointmentId?: string
  onCloseAddAllergy: () => void
}

const AddAllergy = ({
  patientId,
  appointmentId,
  onCloseAddAllergy,
}: AddAllergyProps) => {
  const pathname = usePathname()
  const form = useForm<AddAllergySchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      allergies: [],
    },
  })
  const staff = useStore((store) => store.staffResource)
  const isPatientAllergiesTab = pathname.includes('quicknotes')
  const allergies = form.watch('allergies')

  const handleSubmit = async (e: AddAllergySchemaType) => {
    if (!staff) return
    const resp = await createAllergy(
      patientId,
      e.allergies.map((el) => {
        const onsetBegan = el.startDate
          ? mapToUTCString(
              `${el.startDate}T${
                el.startTime ?? '00:00:00'
              }[${getLocalTimeZone()}]`,
            )
          : ''

        const onsetEnded = el.endDate
          ? mapToUTCString(
              `${el.endDate}T${
                el.endTime ?? '00:00:00'
              }[${getLocalTimeZone()}]`,
            )
          : null
        //todo: Remove number class from appointmentId and encounterId once appointmentId becomes required in props
        return {
          patientId: Number(patientId),
          allergyName: el.allergyName,
          rxNormCode: null,
          allergyType: el.allergyType,
          reactionId: el?.reactionId ?? null,
          severityCode: el.severityCode,
          comment: el.comment,
          onsetBegan,
          onsetEnded,
          staffId: Number(staff.id),
          providerId: Number(staff.id),
          recordStatus: el.status ?? 'Active',
          ...(appointmentId && {
            appointmentId: Number(appointmentId),
            encounterId: Number(appointmentId),
          }),
        }
      }),
    )
    if (resp.state === 'error') {
      toast.error(resp.error)
      return
    }
    onCloseAddAllergy()
  }

  return (
    <FormContainer form={form} onSubmit={handleSubmit}>
      <Flex direction="column" gap="1" className="min-h-28">
        <SearchAllergy />
        {allergies.map((allergy, index) => (
          <AllergyAccordion
            title={allergy.allergyName}
            key={allergy.allergyName}
            index={index}
          />
        ))}
        <Flex className="mt-5" justify="end" gap="2">
          {allergies.length > 0 &&
            (!isPatientAllergiesTab ? (
              <AllergySaveButton />
            ) : (
              <>
                <AllergySaveButton
                  isPatientAllergiesTab={isPatientAllergiesTab}
                />
                {/* This button will be made functional after the surescript work on the BE.*/}
                {/* <AllergySignButton /> */}
              </>
            ))}
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { AddAllergy }
