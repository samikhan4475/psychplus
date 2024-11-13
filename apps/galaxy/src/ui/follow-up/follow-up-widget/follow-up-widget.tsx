'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { WidgetContainer } from '@/components'
import { FollowUpForm } from './follow-up-form'
import { FollowUpHeader } from './follow-up-header'
import { FollowUpTable } from './follow-up-table'
import { useStore } from './store'

interface FollowUpProps {
  patientId: string
}

const FollowUpWidget = ({ patientId }: FollowUpProps) => {
  const searchParams = useSearchParams()

  const appointmentId = searchParams.get('id') || '0'

  const { search } = useStore((state) => ({
    search: state.search,
  }))

  useEffect(() => {
    search({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
    })
  }, [])

  return (
    <Flex className="h-full w-full" direction="column">
      <FollowUpHeader />

      <WidgetContainer>
        <FollowUpForm patientId={patientId} appointmentId={appointmentId} />

        <FollowUpTable />
      </WidgetContainer>
    </Flex>
  )
}

export { FollowUpWidget }
