import React from 'react'

interface PatientAllergyIframe {
  iframeSrc: string
}

const PatientAllergyIframe = ({ iframeSrc }: PatientAllergyIframe) => {
  return (
    <iframe src={iframeSrc} title="Add Allergy" className="h-[80vh] w-full" />
  )
}
export { PatientAllergyIframe }
