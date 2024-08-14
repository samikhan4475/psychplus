import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { PatientParams } from '@psychplus/procedures'
import { getProcedures } from '@psychplus/procedures/api.server'
import { Preloader } from './preloader'
import { ProceduresListWidgetClient } from './procedures-list-widget.client'
import { useStore } from './store'

const ProceduresListWidgetServer = async ({
  patientId,
  noteId,
}: PatientParams) => {
  noStore()

  const procedures = await getProcedures(patientId)

  return (
    <>
      <Preloader
        store={useStore}
        procedures={procedures}
        patientId={patientId}
        noteId={noteId}
      />
      <ProceduresListWidgetClient />
    </>
  )
}
export { ProceduresListWidgetServer }
