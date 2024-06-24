import { cn } from '@psychplus-v2/utils'
import { Flex, Heading } from '@radix-ui/themes'
import { getConsents } from '@/api'
import { CardContainer, CheckConsents, ViewContainer } from '@/components-v2'
import { UpcomingAppointmentsSummary } from '@/features/appointments/upcoming'
import { BillingSummary } from '@/features/billing'
import { CareTeamSummary } from '@/features/care-team'
import { ActiveMedicationsTable } from '@/features/medications'
import { WelcomeBanner } from '@/ui'

const HomePage = async () => {
  const userConsentsResponse = await getConsents()

  if (userConsentsResponse.state === 'error') {
    throw new Error(userConsentsResponse.error)
  }

  return (
    <Flex direction="column" width="100%">
      <CheckConsents userConsents={userConsentsResponse.data} />
      <WelcomeBanner />
      <ViewContainer className="px-5">
        <Flex direction={{ initial: 'column-reverse', lg: 'row' }} gap="5">
          <Flex
            direction={{ initial: 'column', sm: 'row', lg: 'column' }}
            align="start"
            wrap="wrap"
            gap="5"
            className="flex-1"
          >
            <Block
              title="Care Team"
              className="w-full flex-1 lg:min-w-[350px] lg:flex-initial"
            >
              <CareTeamSummary />
            </Block>
            <Block
              title="Insurance"
              className="w-full flex-1 lg:min-w-[350px] lg:flex-initial"
            >
              <BillingSummary />
            </Block>
          </Flex>
          <Flex direction="column" gap="5" className="flex-[3]">
            <Block title="Upcoming Appointments">
              <UpcomingAppointmentsSummary />
            </Block>
          </Flex>
        </Flex>
        <Block title="Medications">
          <CardContainer className="p-0">
            <ActiveMedicationsTable />
          </CardContainer>
        </Block>
      </ViewContainer>
    </Flex>
  )
}

const Block = ({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) => (
  <Flex direction="column" gap="3" className={cn(className)}>
    <Heading
      as="h2"
      weight="bold"
      className="text-[24px] text-accent-12 xs:text-[28px] sm:text-[32px]"
    >
      {title}
    </Heading>
    <Flex direction="column">{children}</Flex>
  </Flex>
)

export default HomePage
