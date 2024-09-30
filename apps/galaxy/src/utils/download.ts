'use client'

const downloadFile = async (endpoint: string, filename: string) => {
  const result = await fetch('/ehr' + endpoint)

  if (!result.ok) {
    throw new Error()
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
