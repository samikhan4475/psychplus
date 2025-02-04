'use client'

import { Edit2Icon } from '@/components/icons'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { useParams } from 'next/navigation'
import { AddMedication } from '../../add-medication'
import { AddMedicationButton } from '../add-medication-button'
import { useStore } from '../store'
interface RowActionEditProps {
  scriptSureAppUrl: string
}
const RowActionEdit = ({ scriptSureAppUrl }: RowActionEditProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const patientId = useParams().id as string
  const { fetchPatientMedications } = useStore();
  const fetchMedications = () => {
    fetchPatientMedications(patientId);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Tooltip content="Edit">
          <IconButton size="1" color="gray" variant="ghost" >
            <Flex justify="between" align="center" gap="1">
              <Edit2Icon
                width={16}
                height={16}
                className="cursor-pointer"
                fill="black"
              />
            </Flex>
          </IconButton>
        </Tooltip>
      </Dialog.Trigger>

      <Dialog.Content
        className="relative max-h-[80vh] max-w-[60vw] overflow-y-scroll">
        <Flex justify="between" align="center" mb="2">
          <Dialog.Title
            size="5"
            weight="bold"
            className="text-black m-0 font-sans"
          >
            Add Medication
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer" onClick={fetchMedications}>
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        {!isFeatureFlagEnabled ? (
          <AddMedication />
        ) : (
          <AddMedicationButton scriptSureAppUrl={scriptSureAppUrl} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionEdit }
