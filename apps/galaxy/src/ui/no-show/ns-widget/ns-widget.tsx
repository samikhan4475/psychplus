import React from 'react'
import { Flex } from '@radix-ui/themes'
import { NoteDetailProps } from '../../quicknotes/actual-note-view/types'
import { PatientInfoBlock } from './blocks/patient-info-block'
import { QuestionnaireBlock } from './blocks/questionnaire-block'

const NoShowDetailView = ({ data, patient, appointment }: NoteDetailProps) => {
  if (data.length === 0) {
    return null
  }
  return (
    <Flex className=" flex-col">
      <PatientInfoBlock appointment={appointment} patient={patient} />
      <QuestionnaireBlock data={data} />
    </Flex>
  )
}

export default NoShowDetailView
