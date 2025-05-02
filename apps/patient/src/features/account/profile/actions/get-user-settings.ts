'use server'

import { getUserSettings } from '../api'

const getUserSettingsAction = async (patientId: number) =>
  await getUserSettings(patientId)

export { getUserSettingsAction }
