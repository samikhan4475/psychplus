'use client'

import { getPatient } from '@psychplus/store/patient'
import { useStore } from './store'

const PatientWidgetClient = () => {
  const patient = getPatient(useStore)

  return (
    <div className="h-full w-full p-4">
      <div className="text-xl">
        This example widget will fetch and display the patient&apos;s name.
      </div>
      <div>
        <b>Patient:</b> {patient.fullName}
      </div>
    </div>
  )
}

export { PatientWidgetClient }
