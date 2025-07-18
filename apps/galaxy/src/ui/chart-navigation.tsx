'use client'

import { useMemo } from 'react'
import NextLink from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { cn, getNavLinks } from '@/utils'

const ChartNavigation = () => {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')
  const visitType = searchParams.get('visitType')
  const visitSequence = searchParams.get('visitSequence')
  const isFeatureLabOrdersFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr4907LabOrdersAndResults,
  )
  const isFeatureFlagEnabledForSecondPhaseFeatures = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr11786EnableGalaxySecondPhaseFeatures,
  )

  const navLinks = useMemo(
    () =>
      getNavLinks(
        appointmentId,
        visitType,
        visitSequence,
        isFeatureLabOrdersFlagEnabled,
        isFeatureFlagEnabledForSecondPhaseFeatures,
      ),
    [appointmentId, visitType, isFeatureLabOrdersFlagEnabled, visitSequence],
  )

  return (
    <Box className="bg-white mb-4 w-[160px] rounded-1 shadow-2">
      <ScrollArea>
        <Flex direction="column">
          {navLinks.map((widget) => {
            const shouldRender =
              !widget.conditions || widget.conditions.every(Boolean)
            if (shouldRender) {
              return (
                <NavigationLink
                  key={widget.label}
                  href={widget.href}
                  appointmentId={appointmentId}
                  visitType={visitType}
                  visitSequence={visitSequence}
                >
                  {widget.label}
                </NavigationLink>
              )
            }

            return null
          })}
        </Flex>
      </ScrollArea>
    </Box>
  )
}

interface NavigationLinkProps {
  href?: string
  appointmentId: string | null
  visitType: string | null
  visitSequence: string | null
}

const NavigationLink = ({
  href,
  appointmentId,
  visitType,
  visitSequence,
  children,
}: React.PropsWithChildren<NavigationLinkProps>) => {
  const pathname = usePathname()
  const { id, apptId } = useParams<{ id: string; apptId?: string }>()
  let fullHref
  const isVisitView = Boolean(apptId || appointmentId)
  if (isVisitView) {
    fullHref = `/p-chart/${id}/${appointmentId}${href}`
  } else {
    fullHref = `/chart/${id}${href}`
  }

  const isActive = pathname === fullHref

  return (
    <NextLink
      prefetch={false}
      href={
        appointmentId
          ? `${fullHref}?id=${appointmentId}&visitType=${visitType}&visitSequence=${visitSequence}`
          : fullHref
      }
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
