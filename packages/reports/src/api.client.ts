import { getError, handleRequest } from '@psychplus/utils/api'
import { createFileHeaders, createHeaders } from '@psychplus/utils/client'
import type { Template } from './types'

interface ReportParameters {
  id: string
  runValue: string
}

const createTemplate = (request: Template): Promise<Template> =>
  handleRequest(
    fetch(`/galaxy/api/reporting/templates`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: createHeaders(),
    }),
  )

const uploadTemplateFile = (file: File, templateId: string) => {
  const formData = new FormData()
  formData.append('file', file)

  return handleRequest(
    fetch(`/galaxy/api/reporting/templates/${templateId}/actions/importdefinition`, {
      method: 'POST',
      body: formData,
      cache: 'no-store',
      headers: createFileHeaders(),
    }),
)
}

const updateTemplate = (request: Template, id: string): Promise<Template> =>
  handleRequest(
    fetch(`/galaxy/api/reporting/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
      headers: createHeaders(),
    }),
  )

const generateReport = async (
  id: string,
  body: ReportParameters[],
): Promise<string> => {
  try {
    const response = await fetch(`/galaxy/api/reporting/templates/${id}/actions/run`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: createHeaders(),
    })
    const text = await response.text()

    if (!response.ok) {
      console.log(`error url: ${response.url}`)
      console.log(`error status: ${response.status} ${response.statusText}`)
      throw text
    }
    return text
  } catch (error) {
    throw getError(error)
  }
}

const searchTemplates = (): Promise<Template[]> => {
  const body = {
    recordStatuses: ['Active', 'Deleted'],
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceStatus: true,
    isIncludeParameter: true,
    isIncludeReportFile: false,
  }

  return handleRequest(
    fetch(
      `/galaxy/api/reporting/templates/actions/search?offset=0&limit=0&orderBy=displayname%20asc`,
      {
        cache: 'no-store',
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(body),
      },
    ),
  )
}

export {
  createTemplate,
  uploadTemplateFile,
  searchTemplates,
  updateTemplate,
  generateReport,
}
