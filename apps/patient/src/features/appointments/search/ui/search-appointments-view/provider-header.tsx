'use client'

import { AppointmentType } from '@psychplus-v2/constants'
import { getNewProviderTypeLabel, getUserFullName } from '@psychplus-v2/utils'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { ProviderAvatar } from '@/components-v2'
import type { AppointmentAvailability } from '@/features/appointments/search/types'
import { renderDistance, renderSpokenLanguages } from './availability-list'
import { ClinicSelector } from './clinic-selector'
import { ProviderBioDialog } from './provider-bio-dialog'

interface ProviderHeaderProps {
  providerDetail: AppointmentAvailability
  appointmentType: AppointmentType
  selectedClinic: number
  setSelectedClinic: (idx: number) => void
  slotsLoading?: boolean
}

const ProviderHeader = ({
  providerDetail,
  appointmentType,
  selectedClinic,
  setSelectedClinic,
  slotsLoading,
}: ProviderHeaderProps) => {
  return (
    
      <Flex direction="column" gap="5" className="mr-[48px] w-[240px]">
        <Flex gap="4">
          <ProviderBioDialog appointmentDetail={providerDetail}>
            <Dialog.Trigger>
              <Button
                variant="ghost"
                className="rounded-full p-0 hover:bg-transparent"
              >
                <ProviderAvatar
                  provider={providerDetail?.specialist}
                  size="5"
                  className="cursor-pointer"
                />
              </Button>
            </Dialog.Trigger>
            <Flex direction="column" justify="center">
              <Dialog.Trigger>
                <Text
                  weight="bold"
                  size="5"
                  className="cursor-pointer text-accent-12"
                >
                  {`${getUserFullName(providerDetail.specialist.legalName)} ${
                    providerDetail.specialist.legalName.honors ?? ''
                  }`}
                </Text>
              </Dialog.Trigger>

              <Flex gap="1">
                <Text
                  weight="medium"
                  className="text-pp-gray-1 text-[12px] uppercase"
                >
                  {getNewProviderTypeLabel(providerDetail.providerType ?? '')}
                </Text>
                <Flex align="center">
                  {Array.from({ length: 5 }, (_, index) => index + 1).map(
                    (value) => (
                      <Box key={value}>
                        {value <= (providerDetail.specialist.rating ?? 0) ? (
                          <StarFilledIcon
                            height={16}
                            width={16}
                            color="#FFC700"
                          />
                        ) : (
                          <StarIcon height={16} width={16} color="#FFC700" />
                        )}
                      </Box>
                    ),
                  )}
                </Flex>
              </Flex>
            </Flex>
          </ProviderBioDialog>
        </Flex>
        <Flex direction="column">
          {appointmentType === AppointmentType.InPerson ? (
            <ClinicSelector
              clinics={providerDetail.clinics}
              selectedClinic={selectedClinic}
              onChange={setSelectedClinic}
              slotsLoading={slotsLoading}
            />
          ) : null}
          <Flex gap="2" justify="between" direction={'column'}>
            {renderSpokenLanguages(providerDetail)}
            {renderDistance(providerDetail?.clinics[selectedClinic])}
          </Flex>
        </Flex>
      </Flex>
    
  )
}

export { ProviderHeader }
