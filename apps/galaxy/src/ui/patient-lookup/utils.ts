import { DateValue } from 'react-aria-components'
import { FieldErrors } from 'react-hook-form'
import {
  Insurance,
  InsurancePolicyPriority,
  SelectOptionType,
  SharedCode,
  SharedCodeAttribute,
} from '@/types'
import { convertToCalendarDate } from '@/utils'
import { PatientLookUpSchemaType } from './patient-filter-form'
import { SortCodesetOptions } from './types'

const getInitialValues = (): PatientLookUpSchemaType => {
  return {
    name: '',
    mrn: '',
    age: '',
    dateOfBirth: null,
    firstName: '',
    gender: '',
    lastName: '',
    city: '',
    hasGuardian: '',
    postalCode: '',
    zipLast4: '',
    telephone: '',
    consentVerificationStatuses: [],
    creditCardVerificationStatuses: [],
    patientCreatedFrom: null,
    patientCreatedTo: null,
    email: '',
    ssn: '',
    patientStatuses: [],
    verificationStatuses: [],
    practices: [],
    insuranceVerificationStatuses: [],
    contactMadeStatuses: '',
    insurancePolicyIds: [],
    visitHistoryPastDays: '',
    futureVisitsByDays: '',
    pastVisitStatus: '',
    nextVisitStatus: '',
    organizations: [],
    stateCode: '',
  }
}

const convertDateField = (field: DateValue | null | undefined) => {
  return field ? convertToCalendarDate(field) : null
}

const hasFieldErrors = (errors: FieldErrors): boolean =>
  Object.keys(errors)?.length > 0

const validateDate = (
  date: DateValue,
  referenceDate: DateValue | undefined | null,
) => {
  return referenceDate ? date?.compare(referenceDate) : 0
}

const sortCodesetBySortAttribute = (
  data: SharedCode[],
  options: SortCodesetOptions = {},
) => {
  const { includeDisabled = false } = options

  return data
    .toSorted((a, b) => {
      const sortValueA = parseInt(
        a?.attributes?.find(
          (attr: SharedCodeAttribute) => attr.name === 'SortValue',
        )?.value ?? '0',
        10,
      )
      const sortValueB = parseInt(
        b?.attributes?.find(
          (attr: SharedCodeAttribute) => attr.name === 'SortValue',
        )?.value ?? '0',
        10,
      )
      return sortValueA - sortValueB
    })
    .map((item) => {
      const baseItem = {
        label: item.display,
        value: item.value,
      }

      if (includeDisabled) {
        const isUserSelectable = item?.attributes?.find(
          (attr: SharedCodeAttribute) => attr.name === 'IsUserSelectable',
        )?.value

        return {
          ...baseItem,
          disabled: isUserSelectable === 'False',
        }
      }
      return baseItem
    })
}

const getOptionLabel = (options: SelectOptionType[] = [], value = '') =>
  options?.find((option) => option?.value === value)?.label

const getPriorityInusranceName = (insurance: Insurance[]) =>
  insurance?.find(
    (ins) => ins?.insurancePolicyPriority === InsurancePolicyPriority.Primary,
  )?.policyName

export {
  getInitialValues,
  convertDateField,
  hasFieldErrors,
  validateDate,
  sortCodesetBySortAttribute,
  getOptionLabel,
  getPriorityInusranceName,
}
