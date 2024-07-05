import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { PatientParams } from '@psychplus/care-plans'
import { getCarePlans } from '@psychplus/care-plans/api.server'
import { getRealCodeSets } from '@psychplus/codeset/api.server'
import { CareplansListWidgetClient } from './care-plans-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

type PatientReferralsListWidgetServerProps = PatientParams

const CarePlansListWidgetServer = async ({
  patientId,
  noteId,
}: PatientReferralsListWidgetServerProps) => {
  noStore()
  let care_plans, codeSets
  try {
    ;[care_plans, codeSets] = await Promise.all([
      getCarePlans(),
      getRealCodeSets(realCodestesRequestParams),
    ])
  } catch (error: any) {
    const errorMessage = `Error fetching data: ${error.status}: "" ${
      error.message || 'Unknown error'
    }`
    return <div>{errorMessage}. Please try again later.</div>
  }

  return (
    <>
      <Preloader
        store={useStore}
        codeSets={codeSets}
        care_plans={care_plans}
        patientId={patientId}
        noteId={noteId}
      />
      <CareplansListWidgetClient />
    </>
  )
}

const realCodestesRequestParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeMetadataPermissions: true,
  isIncludeCodesets: true,
  isIncludeCodes: true,
  isIncludeCodeAttributes: true,
  namespace: 'CDC',
  recordStatuses: ['Active'],
}

export { CarePlansListWidgetServer }
