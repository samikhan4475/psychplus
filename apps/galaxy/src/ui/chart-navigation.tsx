'use client'

import NextLink from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { cn } from '@/utils'

const ChartNavigation = () => {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')

  return (
    <Box className="bg-white mb-4 w-[160px] rounded-1 shadow-2">
      <ScrollArea>
        {appointmentId ? (
          <Flex direction="column">
            <NavigationLink href="/quicknotes">Quick Notes</NavigationLink>
            <NavigationLink href="/notes">Notes</NavigationLink>
            <NavigationLink href="/hpi">
              History of Present Illness
            </NavigationLink>
            <NavigationLink href="/history">History</NavigationLink>
            <NavigationLink href="/questionnaires">
              Questionnaires
            </NavigationLink>
            <NavigationLink href="/vitals">Vitals</NavigationLink>
            <NavigationLink href="/ros">Review of System</NavigationLink>
            <NavigationLink href="/physical-exam">Physical Exam</NavigationLink>
            <NavigationLink href="/mse">Mental Status Exam</NavigationLink>
            <NavigationLink href="/diagnosis">Diagnosis</NavigationLink>
            <NavigationLink href="/assessment-plan">
              Assessment & Plan
            </NavigationLink>
            <NavigationLink href="/medications">Medications</NavigationLink>
            <NavigationLink href="/drug-history">Drug History</NavigationLink>
            <NavigationLink href="/follow-up">Follow Up</NavigationLink>
            <NavigationLink href="/codes">Codes</NavigationLink>
            <NavigationLink href="/after-visit-summary">
              After Visit Summary
            </NavigationLink>
            <NavigationLink href="/care-plan">Care Plan</NavigationLink>
            <NavigationLink href="/allergies">Allergies</NavigationLink>
            <NavigationLink href="/treatment-plan">
              Treatment Plan
            </NavigationLink>
            <NavigationLink href="/patient-info">Patient Info</NavigationLink>
            <NavigationLink href="/referrals">Referrals</NavigationLink>
            <NavigationLink href="/hospital">Hospital</NavigationLink>
            <NavigationLink href="/therapy">Therapy</NavigationLink>
            <NavigationLink href="/pcp">PCP</NavigationLink>
            <NavigationLink href="/pharmacy">Pharmacy</NavigationLink>
            <NavigationLink href="/staff-comments">
              Staff Comments
            </NavigationLink>
            <NavigationLink href="/scheduling-history">
              Scheduling History
            </NavigationLink>
            <NavigationLink href="/add-on">Add On</NavigationLink>
            <NavigationLink href="/rating">Rating</NavigationLink>
            <NavigationLink href="/notifications">Notifications</NavigationLink>
            <NavigationLink href="/patient-tracking">
              Patient Tracking
            </NavigationLink>
            <NavigationLink href="/procedures">Procedures</NavigationLink>
            <NavigationLink href="/billing-history">
              Billing History
            </NavigationLink>
          </Flex>
        ) : (
          <Flex direction="column">
            <NavigationLink href="/scheduling-history">
              Scheduling History
            </NavigationLink>
            <NavigationLink href="/quicknotes">Quick Notes</NavigationLink>
            <NavigationLink href="/notes">Notes</NavigationLink>
            <NavigationLink href="/diagnosis">Diagnosis</NavigationLink>
            <NavigationLink href="/medications">Medications</NavigationLink>
            <NavigationLink href="/drug-history">Drug History</NavigationLink>
            <NavigationLink href="/allergies">Allergies</NavigationLink>
            <NavigationLink href="/treatment-plan">
              Treatment Plan
            </NavigationLink>
            <NavigationLink href="/patient-info">Patient Info</NavigationLink>
            <NavigationLink href="/referrals">Referrals</NavigationLink>
            <NavigationLink href="/pcp">PCP</NavigationLink>
            <NavigationLink href="/pharmacy">Pharmacy</NavigationLink>
            <NavigationLink href="/staff-comments">
              Staff Comments
            </NavigationLink>
            <NavigationLink href="/notifications">Notifications</NavigationLink>
            <NavigationLink href="/procedures">Procedures</NavigationLink>
            <NavigationLink href="/billing-history">
              Billing History
            </NavigationLink>
          </Flex>
        )}
      </ScrollArea>
    </Box>
  )
}

interface NavigationLinkProps {
  href?: string
}

const NavigationLink = ({
  href,
  children,
}: React.PropsWithChildren<NavigationLinkProps>) => {
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')

  href = href ? `/chart/${id}${href}` : `/chart/${id}`

  const isActive = pathname === href

  return (
    <NextLink
      href={appointmentId ? `${href}?id=${appointmentId}` : href}
      className={cn(
        'px-2 py-1 text-[11.5px] first:rounded-t-1 hover:bg-accent-2',
        {
          'text-white bg-accent-12 font-[600] hover:bg-accent-12': isActive,
        },
      )}
    >
      {children}
    </NextLink>
  )
}

export { ChartNavigation }
