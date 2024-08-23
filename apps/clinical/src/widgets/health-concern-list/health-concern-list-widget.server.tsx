import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { type HealthObservationParams } from '@psychplus/health-concerns'
import { getHealthConcerns } from '@psychplus/health-concerns/api.server'
import { HealthConcernListWidgetClient } from './health-concern-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

type PatientHealthConcernsListWidgetServerProps = HealthObservationParams

const HealthConcernListWidgetServer = async ({
  patientId,
  noteId,
}: PatientHealthConcernsListWidgetServerProps) => {
  noStore()

  const [codeSets, healthConcerns] = await Promise.all([
    getCodeSets(),
    getHealthConcerns({
      patientIds: [patientId],
      noteIds: [noteId],
      codingCodes: [],
      // recordStatus: ['Active'],
    }),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        codeSets={codeSets}
        healthConcerns={healthConcerns}
        patientId={patientId}
        noteId={noteId}
      />
      <HealthConcernListWidgetClient />
    </>
  )
}

export { HealthConcernListWidgetServer }
