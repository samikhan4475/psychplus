import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { getRealCodeSets } from '@psychplus/codeset/api.server'
import { PatientParams } from '@psychplus/functional-cognitive'
import { getFunctionalCognitives } from '@psychplus/functional-cognitive/api.server'
import { requestBody } from './components/utils'
import { FunctionalCognitiveListWidgetClient } from './functional-cognitive-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

type PatientReferralsListWidgetServerProps = PatientParams

const FunctionalCognitiveListWidgetServer = async ({
  patientId,
  noteId,
}: PatientReferralsListWidgetServerProps) => {
  noStore()

  const [codeSets, functionalcognitives] = await Promise.all([
    getRealCodeSets(requestBody),
    getFunctionalCognitives(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        codeSets={codeSets}
        functionalcognitives={functionalcognitives}
        patientId={patientId}
        noteId={noteId}
      />
      <FunctionalCognitiveListWidgetClient />
    </>
  )
}
export { FunctionalCognitiveListWidgetServer }
