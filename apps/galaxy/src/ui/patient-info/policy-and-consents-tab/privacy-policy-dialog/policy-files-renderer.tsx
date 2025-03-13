import { useEffect, useState } from 'react'
import { LoadingPlaceholder } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getPolicyHtmlContent } from '../actions'

const PolicyFilesRenderer = ({ policyType }: { policyType?: string }) => {
  const [mergedContent, setMergedContent] = useState('')
  const codes = useCodesetCodes(CODESETS.PatientConsentPolicyType)
  const code = codes.find((el) => el.value === policyType)
  const policyFileNames = code?.attributes
    ?.find((el) => el.name === 'ParameterName')
    ?.value.split('|')
  useEffect(() => {
    if (!policyFileNames || mergedContent) return
    const fetchPolicyContent = async () => {
      const contentPromises = policyFileNames.map((fileName) =>
        getPolicyHtmlContent(fileName),
      )
      const contentResponses = await Promise.all(contentPromises)
      const combinedContent = contentResponses
        .map((response) => {
          if (response.state === 'success') {
            return response.data
          }
          return ''
        })
        .join('<br /')
      setMergedContent(combinedContent)
    }
    fetchPolicyContent()
  }, [policyFileNames, mergedContent])
  if (!mergedContent) return <LoadingPlaceholder />
  return (
    <iframe
      srcDoc={mergedContent}
      className="h-full w-full border-none"
      title={policyType}
    />
  )
}

export { PolicyFilesRenderer }
