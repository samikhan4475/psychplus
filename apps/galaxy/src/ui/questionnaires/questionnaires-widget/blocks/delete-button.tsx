'use client'

import { PropsWithChildren } from 'react'
import { useParams } from 'next/navigation'
import { Button, Tooltip } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'
import { useStore } from '../../store'

type DeleteButtonBlockProps = PropsWithChildren<{
  questionnaireDate: string
  justIcon?: boolean
  questionnaire: string
}>

const DeleteButton = ({
  questionnaireDate,
  questionnaire,
}: DeleteButtonBlockProps) => {
  const patientId = useParams().id as string

  const { handleDeleteQuestionnaire } = useStore((state) => ({
    handleDeleteQuestionnaire: state.handleDeleteQuestionnaire,
  }))

  return (
    <Tooltip content="Delete">
      <Button
        variant="ghost"
        onClick={() =>
          handleDeleteQuestionnaire(questionnaireDate, questionnaire, patientId)
        }
        className="p-1"
        size="1"
        color="gray"
      >
        <Trash2Icon color="black" height="14" width="14" />
      </Button>
    </Tooltip>
  )
}

export { DeleteButton }
