import { Flex } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty, TriggerButton } from '@/components-v2'
import { PatientPharmacy } from '../../types'
import { PharmacyForm } from './pharmacy-form'
import { PharmacyTable } from './pharmacy-table'

interface PharmacyFormsProps {
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
}
const trigger = <TriggerButton title="Add New Pharmacy" />

const PharmacyForms = ({
  pharmacies,
  isDawSystemFeatureFlagEnabled,
}: PharmacyFormsProps) => {
  return (
    <Flex direction="column" gap="2">
      {pharmacies.length > 0 ? (
        <Flex direction="column" width="100%" gap="5">
          <PharmacyTable
            pharmacies={pharmacies}
            isDawSystemFeatureFlagEnabled={isDawSystemFeatureFlagEnabled}
          />
          {!isDawSystemFeatureFlagEnabled && (
            <PharmacyForm
              trigger={trigger}
              pharmacies={pharmacies}
              triggerClassName="justify-start items-start"
            />
          )}
        </Flex>
      ) : (
        <FeatureEmpty
          description="No Pharmacy added yet"
          Icon={EmptyFileIcon}
          action={
            !isDawSystemFeatureFlagEnabled && (
              <PharmacyForm
                pharmacies={pharmacies}
                trigger={trigger}
                triggerClassName="justify-center"
              />
            )
          }
        />
      )}
    </Flex>
  )
}

export { PharmacyForms }
