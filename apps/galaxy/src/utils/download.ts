'use client'

const downloadFile = async <TBody>(
  endpoint: string | URL,
  filename: string,
  method: 'GET' | 'POST' = 'GET',
  bodyData?: TBody,
) => {
  const options: RequestInit = {
    method,
    body: JSON.stringify(bodyData),
    headers: { 'Content-Type': 'application/json' },
  }
  const result = await fetch('/ehr' + endpoint, options)
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  const blob = await result.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.URL.revokeObjectURL(url)
}

export { downloadFile }