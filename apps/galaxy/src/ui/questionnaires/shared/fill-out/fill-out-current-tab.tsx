import React from 'react'
import { useParams } from 'next/navigation'
import { Button, Flex } from '@radix-ui/themes'
import { Input, Label } from 'react-aria-components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HIDDENQUESTIONNAIRESECTIONNAMES } from '../../dashboard-tab/constants'
import { sendToPatient } from '../../utils'
import { SaveButton } from '../save-button'
import { useFormContext } from 'react-hook-form'
import { VADPRS_CHILD_EVALUATION } from '../../vadprs-tab/constants'

type FilloutCurrentTabProps = React.PropsWithChildren<{
  max: number
  value?: number
  widgetId: QuickNoteSectionName
}>

const FilloutCurrentTab = ({
  max,
  value,
  widgetId,
  children,
}: FilloutCurrentTabProps) => {
  const form = useFormContext()
  const { id } = useParams<{ id: string }>()
  const isDisabled = widgetId === QuickNoteSectionName.QuickNoteSectionVadprs && !form.watch(VADPRS_CHILD_EVALUATION);

  return (
    <Flex maxWidth="100%" className="bg-white" px="3" py="1" direction="column">
      <Flex mt="2" direction="column">
        <Flex gap="2">
          <Label>{`${value}/${max}`}</Label>
          <Input
            type="range"
            className="w-[80%]"
            min={0}
            max={max}
            value={value}
            readOnly
          />
        </Flex>
        {children}
      </Flex>
      <Flex gap="2" justify="end" mt="2">
        {!HIDDENQUESTIONNAIRESECTIONNAMES.includes(widgetId) && (
          <Button
            size="1"
            color="gray"
            variant="surface"
            highContrast
            className="h-auto p-2 text-[12px] font-[500]"
            onClick={(e) => {
              e.preventDefault()
              sendToPatient(id, widgetId)
            }}
          >
            Request Patient to Fill
          </Button>
        )}
        <SaveButton disabled={isDisabled} />
      </Flex>
    </Flex>
  )
}

export { FilloutCurrentTab }
