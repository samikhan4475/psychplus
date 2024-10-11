'use client'

import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, ScrollArea } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles } from '../../constants'
import { HistoryView } from './history-view'

type HistoryButtonProps = PropsWithChildren<{
  questionnaire: string
  sectionName: QuickNoteSectionName
  patientId: string
}>

const HistoryButton = ({
  questionnaire,
  sectionName,
  patientId,
}: HistoryButtonProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          size="1"
          color="gray"
          variant="surface"
          highContrast
          className="h-auto px-1 py-1 text-[11px] font-[300]"
        >
          <HistoryIcon width={15} height={15} strokeWidth={1.75} />
          History
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
                QuestionnairesTitles[
                  questionnaire as keyof typeof QuestionnairesTitles
                ]
              }
            </Dialog.Title>
            <Dialog.Close className="cursor-pointer">
              <Cross2Icon />
            </Dialog.Close>
          </Flex>
          <HistoryView
            sectionName={sectionName}
            questionnaire={questionnaire}
            patientId={patientId}
          />
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { HistoryButton }
