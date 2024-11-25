import React from 'react'

interface PharmacyIframe {
  iframeSrc: string
}

const PharmacyIframe = ({ iframeSrc }: PharmacyIframe) => {
  return (
    <iframe src={iframeSrc} title="Add Pharmacy" className="h-[70vh] w-full" />
  )
}
export { PharmacyIframe }
