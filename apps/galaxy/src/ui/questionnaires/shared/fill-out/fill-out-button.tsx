'use client'

import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, ScrollArea } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { quickNotesSectionsTitles } from '../../constants'
import { useStore } from '../history/store'
import { FillOutView } from './fill-out-view'

type FillOutButtonProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
  sectionName: QuickNoteSectionName
}>

const FillOutButton = ({ data, sectionName }: FillOutButtonProps) => {
  const { clearTabs } = useStore((state) => ({
    clearTabs: state.clearTabs,
  }))
  return (
    <Dialog.Root onOpenChange={(open) => !open && clearTabs()}>
      <Dialog.Trigger>
        <Button size="1" className="h-auto bg-accent-11 px-3 py-1">
          Fill out
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="70vw" className="relative">
        <ScrollArea style={{ height: '80vh' }}>
          <Flex justify="between" align="center" pr="3" mb="2">
            <Dialog.Title
              size="5"
              weight="bold"
              className="text-black m-0 font-sans"
            >
              {
                quickNotesSectionsTitles[
                  sectionName as keyof typeof quickNotesSectionsTitles
                ]
              }
            </Dialog.Title>
            <Dialog.Close className="cursor-pointer">
              <Cross2Icon />
            </Dialog.Close>
          </Flex>

          <FillOutView data={data} sectionName={sectionName} />
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { FillOutButton }
