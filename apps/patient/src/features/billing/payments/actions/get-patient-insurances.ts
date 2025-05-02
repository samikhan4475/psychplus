'use server'

import { getPatientInsurances } from '../api'

const getPatientInsurancesAction = () => getPatientInsurances()

export { getPatientInsurancesAction }
