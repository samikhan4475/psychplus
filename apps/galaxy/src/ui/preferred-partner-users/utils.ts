import { PreferredPartnerFiltersSchemaType } from './blocks/schema'
import { PreferredPartnerWorklistFiltersSchemaType } from './blocks/worklist-schema'

export const getWorklistInitialValues =
  (): PreferredPartnerWorklistFiltersSchemaType => ({
    userName: '',
    ssn: '',
    dateFrom: null,
    dateTo: null,
    userStatus: '',
  })

export const getInitialValues = (): PreferredPartnerFiltersSchemaType => ({
  userName: '',
  mrn: '',
  dateFrom: null,
  dateTo: null,
})

