'use client'

import { useStore } from './store'

const PatientWidgetClient = () => {
  const patient = useStore().getPatient()

  return (
    <div className="h-full w-full p-4">
      <div>
        This example widget will fetch and display the patient&apos;s name.
      </div>
      <div>
        <b>Patient:</b> {patient.fullName}
      </div>
    </div>
  )
}

export { PatientWidgetClient }
