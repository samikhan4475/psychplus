'use client'

import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, ScrollArea, Tooltip } from '@radix-ui/themes'
import { EyeIcon } from '@/components/icons'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles } from '../../constants'
import { questionnaireViewConstants } from './constant'
import { QuestionnaireViewPopup } from './questionnaires-view-pop'

type ViewButtonBlockProps = PropsWithChildren<{
  justIcon?: boolean
  data: QuickNoteSectionItem[]
  quickNoteSectionName: QuickNoteSectionName
}>

const ViewButton = ({
  justIcon = false,
  data,
  quickNoteSectionName,
}: ViewButtonBlockProps) => {
  const currentQuestionnaire = questionnaireViewConstants(
    quickNoteSectionName as QuickNoteSectionName,
  )
  return (
    <Tooltip content="View">
      <Button variant="ghost" onClick={(e) => e.preventDefault()}>
        <Dialog.Root>
          <Dialog.Trigger>
            {justIcon ? (
              <EyeIcon height="14" width="14" />
            ) : (
              <Button
                size="1"
                color="gray"
                variant="surface"
                highContrast
                className="h-auto px-1 py-1 text-[11px] font-[300]"
              >
                View
              </Button>
            )}
          </Dialog.Trigger>

          <Dialog.Content maxWidth="70vw" className="relative">
            <ScrollArea style={{ height: '65vh' }}>
              <Flex justify="between" align="center" pr="3" mb="2">
                <Dialog.Title
                  size="5"
                  weight="bold"
                  className="text-black m-0 font-sans"
                >
                  {
                    QuestionnairesTitles[
                      currentQuestionnaire.questionnaireTab as keyof typeof QuestionnairesTitles
                    ]
                  }
                </Dialog.Title>
                <Dialog.Close className="cursor-pointer">
                  <Cross2Icon />
                </Dialog.Close>
              </Flex>
              <QuestionnaireViewPopup
                data={data || []}
                quickNoteSectionName={quickNoteSectionName}
              />
            </ScrollArea>
          </Dialog.Content>
        </Dialog.Root>
      </Button>
    </Tooltip>
  )
}

export { ViewButton }
