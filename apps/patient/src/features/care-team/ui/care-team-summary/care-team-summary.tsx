import { getUserFullName, withSuspense } from '@psychplus-v2/utils'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { StethoscopeIcon } from 'lucide-react'
import {
  CardContainer,
  FeatureEmpty,
  LoadingPlaceholder,
  ProviderAvatar,
} from '@/components-v2'
import { getCareTeam } from '../../api'
import { CareTeamBookButton } from './care-team-book-button'

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
                  className="h-[88px] w-[88px]"
                  provider={row.staffDetails}
                />
                <Flex direction="column" align="start">
                  <Flex align="center" gap="2" className="mb-1">
                    <Text className="text-[18px] font-[600] text-[#1A1A1A]">
                      {getUserFullName(row.staffDetails.legalName)}
                    </Text>

                    <CareTeamBookButton careTeamMember={row} icon />
                  </Flex>

                  <Text className="mb-4 text-[14px] font-medium uppercase text-[#60646C] text-accent-12">
                    Primary {row.specialist}
                  </Text>
                  <CareTeamBookButton careTeamMember={row} />
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
            <Separator className="my-[18px] w-full" />
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
