'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { Button, Flex, Text } from '@radix-ui/themes'
import { RefreshCcw } from 'lucide-react'
import { AddLabOrderView } from '../add-lab-order'
import { useStore } from './store'

const AddLabOrdersButton = () => {
  const fetch = useStore((state) => state.fetch)
  const loading = useStore((state) => state.loading)

  const searchParams = useSearchParams()
  const { id } = useParams<{ id: string }>()
  const appointmentId = searchParams.get('id') ?? '0'

  return (
    <Flex align="center" justify="end" gap="2" className="flex-1">
      <Button
        className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
        type="button"
        disabled={loading}
        onClick={() =>
          fetch(appointmentId, {
            patientId: [id],
            ...(appointmentId !== '0'
              ? { appointmentIds: [appointmentId] }
              : {}),
          })
        }
      >
        <RefreshCcw className="text-pp-gray-3" width="16px" height="16px" />
        <Text className="text-pp-black-3 text-1">Refresh</Text>
      </Button>
      {appointmentId !== '0' && <AddLabOrderView />}
    </Flex>
  )
}

export { AddLabOrdersButton }
