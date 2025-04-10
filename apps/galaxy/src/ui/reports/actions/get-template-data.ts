'use server'

import * as api from '@/api'
import { Template } from '../types'

interface EditTemplateParams {
  templateId: string
  data: Template
}

const editTemplateAction = async ({
  templateId,
  data,
}: EditTemplateParams): Promise<api.ActionResult<Template>> => {
  const result = await api.PUT<Template>(
    api.EDIT_TEMPLATE_ENDPOINT(templateId),
    data,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { editTemplateAction }
