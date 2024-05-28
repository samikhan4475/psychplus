import NextLink from 'next/link'
import { getUserFullName, withSuspense } from '@psychplus-v2/utils'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { StethoscopeIcon } from 'lucide-react'
import {
  CardContainer,
  FeatureEmpty,
  LoadingPlaceholder,
  ProviderAvatar,
} from '@/components-v2'
import { getCareTeam } from '../../api'
import { EditIcon } from '@/components'

const ServerComponent = async () => {
  const response = await getCareTeam()

  if (response.state === 'error') {
    throw new Error(response.error)
  }

  const data = response.data.careTeam

  if (data.length === 0) {
    return (
      <CardContainer>
        <FeatureEmpty
          title="No Care Team Assigned"
          description="You do not have a care team assigned yet! When you do, you'll see them here."
          // action={
          //   <Flex direction="column" wrap="wrap" gap="4" mt="3">
          //     <Button size="3" highContrast>
          //       Find a Psychiatrist
          //     </Button>
          //     <Button size="3" highContrast>
          //       Find a Therapist
          //     </Button>
          //   </Flex>
          // }
          Icon={StethoscopeIcon}
        />
      </CardContainer>
    )
  }

  return (
    <CardContainer>
      {data.map((row, index) => (
        <>
          <Flex key={row.id} direction="column">
            <Flex direction="column">
              <Flex
                direction={{ initial: 'column', xs: 'row' }}
                align="start"
                gap="4"
              >
                <ProviderAvatar
                  size={{ initial: '8', sm: '7' }}
                  provider={row.staffDetails}
                />
                <Flex direction="column" align="start" gap="3">
                  <Flex align="start" gap="2" className="mb-1">
                    <Text className="text-[18px] text-[#1A1A1A] font-[600] leading-2 -tracking-[0.25px]">
                      {getUserFullName(row.staffDetails.legalName)}
                    </Text>

                    <EditIcon />
                  </Flex>

                  <Text className="text-[14px] text-accent-12 uppercase text-gray-10 font-medium">
                    {row.specialist}
                  </Text>

                  <Button
                    variant="outline"
                    size={{ initial: '3', xs: '2', sm: '1' }}
                    mt="2"
                    mb={{ initial: '1', sm: '2' }}
                    ml={{ initial: '-2', xs: '0' }}
                    highContrast
                    asChild
                  >
                    <NextLink href="/appointments/search" prefetch={false}>
                      Book Appointment
                    </NextLink>
                  </Button>
                  <Text className="cursor-pointer p-2 pl-0 text-[15px] text-accent-12 underline-offset-4 hover:underline xs:text-[13px] sm:p-0">
                    <NextLink href="/appointments/search" prefetch={false}>
                      Change provider
                    </NextLink>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {index !== data.length - 1 ? (
            <Separator my="4" className="w-full" />
          ) : null}
        </>
      ))}
    </CardContainer>
  )
}

const CareTeamSummary = withSuspense(ServerComponent, {
  fallback: (
    <CardContainer>
      <LoadingPlaceholder />
    </CardContainer>
  ),
})

export { CareTeamSummary }
