import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { CareTeamMember } from '../types'

const getCareTeam = () =>
  api.GET<{ careTeam: CareTeamMember[] }>(
    `${API_URL}/api/patients/self/careteam`,
  )

export { getCareTeam }
