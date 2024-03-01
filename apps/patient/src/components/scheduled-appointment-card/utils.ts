import { Clinic } from '@psychplus/clinics'
import { Address } from '@psychplus/clinics/shared'
import { Staff } from '@psychplus/staff'

const handleGetDirections = (address?: Address) => {
  if (address) {
    const query = encodeURIComponent(
      `${address.street1}, ${address.city}, ${address.state} ${address.postalCode}`,
    )

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
    window.open(mapUrl, '_blank')
  }
}

const renderSpecialistName = (staff: Staff | undefined) =>
  `${staff?.legalName?.title || ''} ${staff?.legalName?.firstName || ''} ${
    staff?.legalName?.lastName || ''
  }, ${staff?.legalName?.honors || ''}`.replace(/,\s*$/, '')

const renderClinicAddress = (clinic: Clinic | undefined) =>
  `${clinic?.contact?.addresses?.[0]?.street1 || ''}, ${
    clinic?.contact?.addresses?.[0]?.city || ''
  }, ${clinic?.contact?.addresses?.[0]?.state || ''} ${
    clinic?.contact?.addresses?.[0]?.postalCode || ''
  }`.replace(/,\s*$/, '')

const isVirtualAppointmentType = (type?: string) => {
  return type && ['TeleVisit', 'Virtual'].includes(type)
}

export {
  handleGetDirections,
  renderSpecialistName,
  renderClinicAddress,
  isVirtualAppointmentType,
}
