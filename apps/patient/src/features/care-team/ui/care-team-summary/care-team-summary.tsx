import NextLink from 'next/link'
import { getUserFullName, withSuspense } from '@psychplus-v2/utils'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { StethoscopeIcon } from 'lucide-react'
import { EditIcon } from '@/components'
import {
  CardContainer,
  FeatureEmpty,
  LoadingPlaceholder,
  ProviderAvatar,
} from '@/components-v2'
import { getCareTeam } from '../../api'

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
    <CardContainer className="px-4 py-[30px]">
      {data.map((row, index) => (
        <>
          <Flex key={row.id} direction="column">
            <Flex direction="column">
              <Flex
                direction={{ initial: 'column', xs: 'row' }}
                align="start"
                gap="3"
              >
                <ProviderAvatar
                  className="w-[88px] h-[88px]"
                  provider={row.staffDetails}
                />
                <Flex direction="column" align="start">
                  <Flex align="center" gap="2" className="mb-1">
                    <Text className="text-[18px] font-[600] text-[#1A1A1A]">
                      {getUserFullName(row.staffDetails.legalName)}
                    </Text>

                    <NextLink href="/appointments/search" prefetch={false} className="cursor-pointer">
                      <EditIcon width="13" height="14"/>
                    </NextLink>
                  </Flex>

                  <Text className="text-[14px] font-medium uppercase text-accent-12 text-[#60646C] mb-4">
                    {row.specialist}
                  </Text>

                  <Button
                    variant="outline"
                    className="px-6 py-2 text-[14px]"
                    highContrast
                    asChild
                  >
                    <NextLink href="/appointments/search" prefetch={false}>
                      Book Appointment
                    </NextLink>
                  </Button>
                  {/* <Text className="cursor-pointer p-2 pl-0 text-[15px] text-accent-12 underline-offset-4 hover:underline xs:text-[13px] sm:p-0">
                    <NextLink href="/appointments/search" prefetch={false}>
                      Change provider
                    </NextLink>
                  </Text> */}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {index !== data.length - 1 ? (
            <Separator className="w-full my-[18px]" />
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
