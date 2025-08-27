'use client'

import { Flex } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { Experience } from '@/types'
import { EditExperienceDialog } from '../edit-experience'
import { useStore } from '../store'

const ActionCell = ({
  row: { original: experience },
}: PropsWithRow<Experience>) => {
  const store = useStore()
  const { refetch } = zustandUseStore(store, (state) => ({
    refetch: state.refetch,
  }))
  const onClose = () => {
    refetch()
  }

  return (
    <Flex justify="center" gap="1" className="w-[70px]">
      <EditExperienceDialog experience={experience} onClose={onClose} />
    </Flex>
  )
}

export { ActionCell }
