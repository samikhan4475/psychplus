'use client'

import { PatientProfile } from '@psychplus-v2/types'
import { Flex } from '@radix-ui/themes'
import { ToggleableForm } from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'
import { useGooglePlacesContext } from '@/providers'
import { useStore } from '../../../../store'
import AddressCard from './components/address-card'
import PatientInfoCard from './components/patient-info-card'
import { usePatientForm } from './hooks/use-patient-form'
import { patientSchemaType } from './patient-info-schema'

const PatientInfo = () => {
  const { isSaveButtonPressed, save, resetSaveButtonState } = useStore()
  const { loaded } = useGooglePlacesContext()
  const { form, formatPatientData, setProfile } = usePatientForm()
  const patientId = useProfileStore((state) => state.profile.id)

  const onSuccess = (data: PatientProfile) => {
    setProfile(data)
    save({ patientId })
  }

  const submitAction = async (data: patientSchemaType) =>
    updateProfileAction(formatPatientData(data))

  return (
    <ToggleableForm
      form={form}
      submitAction={submitAction}
      onSuccess={onSuccess}
      isExternalSavePressed={isSaveButtonPressed}
      resetExternalSaveState={resetSaveButtonState}
      onError={resetSaveButtonState}
      allowExternalSave
    >
      <Flex direction="column" gap="3" className="w-full" mb="4">
        <PatientInfoCard />
        {loaded && <AddressCard />}
      </Flex>
    </ToggleableForm>
  )
}

export { PatientInfo }
