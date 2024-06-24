import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { getRealCodeSets } from '@psychplus/codeset/api.server'
import { PatientParams } from '@psychplus/problems'
import { getProblems } from '@psychplus/problems/api.server'
import { requestBody } from './components/utils'
import { Preloader } from './preloader'
import { ProblemsListWidgetClient } from './problems-list-widget.client'
import { useStore } from './store'

type PatientReferralsListWidgetServerProps = PatientParams

const ProblemsListWidgetServer = async ({
  patientId,
  noteId,
}: PatientReferralsListWidgetServerProps) => {
  noStore()

  const [codeSets, problems] = await Promise.all([
    getRealCodeSets(requestBody),
    getProblems(patientId),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        codeSets={codeSets}
        problems={problems}
        patientId={patientId}
        noteId={noteId}
      />
      <ProblemsListWidgetClient />
    </>
  )
}
export { ProblemsListWidgetServer }
