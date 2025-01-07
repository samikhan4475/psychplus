'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { Cosigner } from '@/types'
import { getPatientFullName } from '@/utils'
import { useStore } from './quicknotes-store'

interface QuickNotesCosignerDropdownProps {
  cosigners: Cosigner[]
}
const QuickNotesCosignerDropdown = ({
  cosigners,
}: QuickNotesCosignerDropdownProps) => {
  const { signOptions, setSignOptions } = useStore((state) => ({
    signOptions: state.signOptions,
    setSignOptions: state.setSignOptions,
  }))

  const getLabel = (value: string) => {
    const selectedOption = cosigners.find(
      (option) => option?.id === Number(value),
    )
    return selectedOption?.legalName
      ? getPatientFullName(selectedOption?.legalName)
      : undefined
  }

  const cosignerId = signOptions.coSignedByUserId
    ? signOptions.cosSignedByUserId
    : String(cosigners[0]?.id)

  const label = getLabel(cosignerId)

  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Cosigner
      </Text>
      <Select.Root
        size="1"
        onValueChange={(value) => setSignOptions({ coSignedByUserId: value })}
        value={signOptions.coSignedByUserId}
        defaultValue={String(cosigners[0]?.id)}
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
          {cosigners?.map(({ id, legalName }, ind) => (
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
