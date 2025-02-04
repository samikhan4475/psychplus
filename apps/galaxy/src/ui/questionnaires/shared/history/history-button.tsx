'use client'

import { PropsWithChildren, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, ScrollArea, Tooltip } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { PermissionAlert } from '@/ui/schedule/shared'
import { quickNotesSectionsTitles } from '../../constants'
import { QuestionnaireHistory } from './questionnaire-history-popup'
import { useStore } from './store'

type HistoryButtonBlockProps = PropsWithChildren<{
  questionnaire: string
  justIcon?: boolean
}>

const HistoryButtonUnAuthorized = ({ isIcon }: { isIcon: boolean }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        size="1"
        color="gray"
        onClick={() => setOpen(true)}
        variant={isIcon ? 'ghost' : 'surface'}
        className="flex items-center p-1"
      >
        {isIcon ? (
          <HistoryIcon color="black" height="14" width="14" />
        ) : (
          <Flex gap="1">
            <HistoryIcon width={15} height={15} strokeWidth={1.75} />
            History
          </Flex>
        )}
      </Button>
      <PermissionAlert
        message="You do not have permission to view history. Please contact your supervisor if you need any further assistance"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

const HistoryDialogContent = ({
  questionnaire,
  isIcon,
}: {
  questionnaire: string
  isIcon: boolean
}) => {
  const { clearTabs } = useStore((state) => ({
    clearTabs: state.clearTabs,
  }))

  return (
    <Button
      type="button"
      size="1"
      color="gray"
      variant={isIcon ? 'ghost' : 'surface'}
      className="flex items-center p-1"
    >
      <Dialog.Root
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            clearTabs()
          }
        }}
      >
        <Dialog.Trigger>
          {isIcon ? (
            <HistoryIcon color="black" height="14" width="14" />
          ) : (
            <Flex gap="1">
              <HistoryIcon width={15} height={15} strokeWidth={1.75} />
              History
            </Flex>
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
                  quickNotesSectionsTitles[
                    questionnaire as keyof typeof quickNotesSectionsTitles
                  ]
                }
              </Dialog.Title>
              <Dialog.Close className="cursor-pointer">
                <Cross2Icon />
              </Dialog.Close>
            </Flex>
            <QuestionnaireHistory
              questionnaire={questionnaire as QuickNoteSectionName}
            />
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Root>
    </Button>
  )
}

const HistoryButton = ({
  questionnaire,
  justIcon = false,
}: HistoryButtonBlockProps) => {
  const hasPermission = useHasPermission('viewButtonQuestionnaireHistoryPage')

  return (
    <Tooltip content="History">
      {!hasPermission ? (
        <HistoryButtonUnAuthorized isIcon={justIcon} />
      ) : (
        <HistoryDialogContent questionnaire={questionnaire} isIcon={justIcon} />
      )}
    </Tooltip>
  )
}

export { HistoryButton }
