'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { Document, DocumentType } from '@psychplus-v2/types'

const getDocument = async (documentType: DocumentType) =>
  api.GET<Document>(`${API_URL}/api/metadata/documents/${documentType}`, {
    next: {
      revalidate: 3600,
    },
  })

export { getDocument }
