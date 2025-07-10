'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { ConfigurationResponse } from '@psychplus-v2/types'

const getConfiguration = () =>
  api.GET<ConfigurationResponse>(`${API_URL}/api/metadata/configuration`)

export { getConfiguration }
