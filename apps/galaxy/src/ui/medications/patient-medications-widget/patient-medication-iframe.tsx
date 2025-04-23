'use client'

import React from 'react'

interface PatientMedicationIframe {
  iframeSrc: string
}

const PatientMedicationIframe = ({ iframeSrc }: PatientMedicationIframe) => {
  return (
    <iframe src={iframeSrc} title="Add Allergies" className="h-[85vh] w-full" />
  )
}
export { PatientMedicationIframe }
