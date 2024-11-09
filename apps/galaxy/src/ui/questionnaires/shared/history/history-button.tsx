'use client'

import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, ScrollArea, Tooltip } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles } from '../../constants'
import { HistoryView } from './history-view'

type HistoryButtonBlockProps = PropsWithChildren<{
  questionnaire: string
  justIcon?: boolean
}>

const HistoryButton = ({
  questionnaire,
  justIcon = false,
}: HistoryButtonBlockProps) => {
  return (
    <Tooltip content="History">
      <Button variant="ghost" onClick={(e) => e.preventDefault()}>
        <Dialog.Root>
          <Dialog.Trigger>
            {justIcon ? (
              <HistoryIcon color="black" height="14" width="14" />
            ) : (
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
            )}
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
                questionnaire={questionnaire as QuickNoteSectionName}
              />
            </ScrollArea>
          </Dialog.Content>
        </Dialog.Root>
      </Button>
    </Tooltip>
  )
}

export { HistoryButton }
