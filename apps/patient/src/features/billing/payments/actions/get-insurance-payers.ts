'use server'

import { getInsurancePayers } from '../api'

const getInsurancePayersAction = () => getInsurancePayers()

export { getInsurancePayersAction }
