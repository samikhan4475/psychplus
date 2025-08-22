import { FieldErrors } from 'react-hook-form'
import { ExperienceSchemaType } from './filter-form'

const getInitialValues = (): ExperienceSchemaType => {
  return {
    fromDateTime: null,
    toDateTime: null,
    patientFirstName: '',
    patientLastName: '',
    age: '',
    gender: undefined,
    dateOfBirth: null,
    locationId: '',
    visitType: '',
    insurance: '',
    payerPlanIds: [],
    rating: '',
    appointmentRatingReason: '',
    comment: '',
  }
}

const hasFieldErrors = (errors: FieldErrors): boolean =>
  Object.keys(errors)?.length > 0

export { getInitialValues, hasFieldErrors }
