'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { Edit2Icon } from '@/components/icons'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { AddAllergyButton } from '../add-allergy-button'
import { EditAllergy } from '../edit-allergy'
import { useStore } from '../store'
import { AllergyDataResponse } from '../types'

interface RowActionEditProps {
  scriptSureAppUrl: string
  row: Row<AllergyDataResponse>
}
const RowActionEdit = ({ scriptSureAppUrl, row }: RowActionEditProps) => {
  const { id } = useParams<{ id: string }>()
  const { allergiesListSearch } = useStore()
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const [showAllergyPopup, setShowAllergyPopup] = useState(true)

  const fetchAllergies = () => {
    allergiesListSearch(id)
  }

  useEffect(() => {
    if (!showAllergyPopup) {
      fetchAllergies()
      setShowAllergyPopup(true)
    }
  }, [showAllergyPopup])

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
            Edit Allergy
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer" onClick={fetchAllergies}>
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        {!isFeatureFlagEnabled ? (
          <EditAllergy
            patientId={id}
            row={row}
            onCloseEditAllergy={() => setShowAllergyPopup(false)}
          />
        ) : (
          <AddAllergyButton scriptSureAppUrl={scriptSureAppUrl} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionEdit }
