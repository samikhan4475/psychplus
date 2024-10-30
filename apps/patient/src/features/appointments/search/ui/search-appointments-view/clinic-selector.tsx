import { cn, getClinicAddressLabel } from '@psychplus-v2/utils'
import { Box, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { CheckIcon, ChevronDownIcon, MapPinIcon } from 'lucide-react'
import type { AppointmentClinic } from '@/features/appointments/search/types'

interface ClinicSelectorProps {
  clinics: AppointmentClinic[]
  selectedClinic: number
  onChange: (value: number) => void
}

const ClinicSelector = ({
  clinics,
  selectedClinic,
  onChange,
}: ClinicSelectorProps) => {
  const hasMultipleClinics = clinics.length > 1

  return (
    <Flex gap="1">
      <MapPinIcon
        width={20}
        height={20}
        strokeWidth={1.25}
        className="mt-[6px] min-w-[20px] text-accent-12"
      />
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger disabled={!hasMultipleClinics}>
          <Flex
            gap="2"
            py="1"
            px="2"
            className={cn({
              'cursor-pointer rounded-2 hover:bg-gray-2': hasMultipleClinics,
            })}
          >
            <Text className="text-[12px] font-[600]">
              {clinics[selectedClinic].name}{' '}
              {getClinicAddressLabel(clinics[selectedClinic]?.contact?.addresses)}
            </Text>
            {hasMultipleClinics ? (
              <ChevronDownIcon
                width={16}
                height={16}
                strokeWidth={1.5}
                className="min-w-[16px]"
              />
            ) : null}
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="2" highContrast>
          {clinics.map((clinic, index) => (
            <DropdownMenu.Item
              key={clinic.id}
              onClick={() => {
                onChange(index)
              }}
              className="group flex h-fit items-start justify-start gap-2 py-1"
            >
              {index === selectedClinic ? (
                <CheckIcon
                  width={16}
                  height={16}
                  strokeWidth={1.75}
                  className="group-hover:text-white mt-1 min-w-[16px] text-accent-12"
                />
              ) : (
                <Box className="w-[16px] min-w-[16px]" />
              )}
              <Flex direction="column">
                <Text weight="medium" className="text-[12px]">
                  {clinic.name}
                </Text>
                <Text className="text-[12px]">
                  {getClinicAddressLabel(clinic.contact?.addresses)}
                </Text>
              </Flex>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}

export { ClinicSelector }
