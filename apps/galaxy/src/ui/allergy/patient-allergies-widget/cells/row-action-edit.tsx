'use client'

import { useParams  } from 'next/navigation'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { Edit2Icon } from '@/components/icons'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { AddAllergy } from '../add-allergy'
import { AddAllergyButton } from '../add-allergy-button'
import { useStore } from '../store'

interface RowActionEditProps {
  scriptSureAppUrl: string
}
const RowActionEdit = ({ scriptSureAppUrl }: RowActionEditProps) => {
  const { id } = useParams<{ id: string }>()

  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const { allergiesListSearch } = useStore()
  const fetchAllergies = () => {
    allergiesListSearch(id)
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton size="1" color="gray" variant="ghost">
        <Tooltip content="Edit">
          <Flex justify="between" align="center" gap="1">
            <Edit2Icon
              width={16}
              height={16}
              className="cursor-pointer"
              fill="black"
            />
          </Flex>
          </Tooltip>
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-h-[80vh] max-w-[60vw] overflow-y-scroll">
        <Flex justify="between" align="center" mb="2">
          <Dialog.Title
            size="5"
            weight="bold"
            className="text-black m-0 font-sans"
          >
            Add Allergies
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer" onClick={fetchAllergies}>
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        {!isFeatureFlagEnabled ? (
          <AddAllergy />
        ) : (
          <AddAllergyButton scriptSureAppUrl={scriptSureAppUrl} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionEdit }
