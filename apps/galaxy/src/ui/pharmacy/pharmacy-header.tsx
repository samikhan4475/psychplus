'use client'

import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PharmacyAddButton } from './pharmacy-add-button'
import { useStore } from './store'
import { WidgetAddButton } from './widget-add-button'

const PharmacyHeader = () => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const { setPharmacies, fetchPatientPharmacies } = useStore((state) => ({
    setPharmacies: state.setPharmacies,
    fetchPatientPharmacies: state.fetchPatientPharmacies,
  }))
  const patientId = useParams().id as string

  const onClose = () => {
    setPharmacies([])
    fetchPatientPharmacies(patientId)
  }
  const addPharmacyPermission = useHasPermission('addPharmacy')
  const { setIsErrorAlertOpen, setErrorMessage } = useStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
  }))

  const onClick = () => {
    if (!addPharmacyPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to add pharmacy. Please contact your supervisor if you need any further assistance.',
      )
      return false
    }
    return true
  }

  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white px-2 py-1 pr-3 shadow-2"
    >
      <Text className="flex items-center gap-x-[11px] text-[20px] font-bold">
        Pharmacy
      </Text>
      {!isFeatureFlagEnabled && (
        <WidgetAddButton
          title="Add Pharmacy"
          onClose={onClose}
          onClick={onClick}
        >
          <PharmacyAddButton />
        </WidgetAddButton>
      )}
    </Flex>
  )
}

export { PharmacyHeader }
