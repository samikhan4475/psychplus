import { GlobeIcon } from '@radix-ui/react-icons'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import { CodeSet } from '@psychplus/codeset'
import { Staff } from '@psychplus/staff'
import {
  darkGrayColor,
  Lagoon,
  psychPlusBlueColor,
  StarRating,
} from '@/components'
import { DistanceIcon } from '@/components/icons/distance-icon'
import { LocationMarkerIcon } from '@/components/icons/location-marker-icon'
import { useStore } from '../../store'

const ProvidersComponent = ({
  staff,
  appointmentType,
}: {
  staff: Staff
  appointmentType: string
}) => {
  const specialistTypeCodeSet = useStore((state) => state.specialistTypeCodeSet)

  return (
    <Flex gap="2">
      <Flex>
        <Avatar
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          color="gray"
          fallback="A"
          size="7"
          radius="full"
        />
      </Flex>
      <Flex direction="column" style={{ color: psychPlusBlueColor }} gap="3">
        <Text className="font-bold" size="5">
          {staff.legalName.title && `${staff.legalName.title}. `}
          {staff.legalName.firstName} {staff.legalName.lastName}{' '}
          {staff.legalName.honors}
        </Text>
        <Flex align="center">
          <StarRating filledStars={3} />
          <Text size="1" style={{ color: Lagoon }}>
            {StaffRoleDisplay(staff.staffRoleCode, specialistTypeCodeSet)}
          </Text>
        </Flex>
        <Flex direction="column" mt="4" gap="2">
          {appointmentType === 'In-Person' && (
            <Flex gap="2" className="w-40">
              <Flex>
                <LocationMarkerIcon />
              </Flex>
              <Text style={{ color: darkGrayColor }} size="2">
                {staff?.contactInfo?.addresses?.[0].street1}{' '}
                {staff?.contactInfo?.addresses?.[0].postalCode}
              </Text>
            </Flex>
          )}
          <Flex align="center" className="w-48">
            <Flex className="flex-1" gap="2">
              <Flex>
                <GlobeIcon height={20} width={20} color={psychPlusBlueColor} />
              </Flex>
              <Text style={{ color: darkGrayColor }} size="2">
                {staff?.spokenLanguages?.[0]}{' '}
              </Text>
            </Flex>

            {appointmentType === 'In-Person' && (
              <Flex gap="2" align="end">
                <Flex>
                  <DistanceIcon />
                </Flex>
                <Text style={{ color: darkGrayColor }} size="2">
                  291.47mi
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

const StaffRoleDisplay = (
  roleCode: string,
  specialistTypeCodeSet: CodeSet | undefined,
) => {
  return specialistTypeCodeSet?.codes.find((code) => code.code === roleCode)
    ?.display
}

export { ProvidersComponent }
