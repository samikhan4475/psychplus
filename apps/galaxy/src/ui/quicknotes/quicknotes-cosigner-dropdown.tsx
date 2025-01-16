'use client'

import { useEffect } from 'react'
import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { Cosigner } from '@/types'
import { filterDefaultCosigner, getPatientFullName } from '@/utils'
import { useStore } from './store'

interface QuickNotesCosignerDropdownProps {
  cosigners: Cosigner[]
}

const QuickNotesCosignerDropdown = ({
  cosigners,
}: QuickNotesCosignerDropdownProps) => {
  const uniqueCosigners = Array.from(
    new Map(cosigners.map((item) => [item.id, item])).values(),
  )
  const { signOptions, setSignOptions, setCosignerLabel } = useStore(
    (state) => ({
      signOptions: state.signOptions,
      setSignOptions: state.setSignOptions,
      setCosignerLabel: state.setCosignerLabel,
    }),
  )

  const getLabel = (value: string) => {
    const selectedOption = uniqueCosigners.find(
      (option) => option?.id === Number(value),
    )
    return selectedOption?.legalName
      ? getPatientFullName(selectedOption?.legalName)
      : ''
  }

  const cosignerId =
    signOptions.coSignedByUserId !== undefined &&
    signOptions.coSignedByUserId !== null
      ? String(signOptions.coSignedByUserId)
      : String(filterDefaultCosigner(uniqueCosigners || [])?.id || '')

  const label = getLabel(cosignerId)

  useEffect(() => {
    setCosignerLabel(label || '')
  }, [label, setCosignerLabel])

  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Cosigner
      </Text>
      <Select.Root
        size="1"
        onValueChange={(value) => setSignOptions({ coSignedByUserId: value })}
        value={cosignerId || ''}
        defaultValue={cosignerId || ''}
      >
        {label ? (
          <Tooltip content={label}>
            <Select.Trigger className="max-w-[150px]" placeholder="Cosigners" />
          </Tooltip>
        ) : (
          <Select.Trigger className="max-w-[150px]" placeholder="Cosigners" />
        )}
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {uniqueCosigners?.map(({ id, legalName }, ind) => (
            <Select.Item key={`${id}-${ind}`} value={String(id)}>
              {getPatientFullName(legalName)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesCosignerDropdown }
