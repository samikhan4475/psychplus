import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { AcsInfo, AcsInfoPayload } from '../types'

const getAcsInfo = (payload: AcsInfoPayload) =>
  api.POST<AcsInfo>(
    `${API_URL}/api/communications/actions/anonymousaccesstoken`,
    payload,
  )

export { getAcsInfo }
