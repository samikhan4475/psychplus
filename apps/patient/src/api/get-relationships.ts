import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { RelationshipData } from '@psychplus-v2/types'

const getRelationship = () =>
  api.GET<RelationshipData[]>(`${API_URL}/api/patients/self/relationships`)

export { getRelationship }