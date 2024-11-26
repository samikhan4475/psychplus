import { CODESETS } from '@psychplus-v2/constants'
import { Box } from '@radix-ui/themes'
import { getCodesets } from '@/api'
import { CodesetStoreProvider } from '@/providers'
import { PreCheckinAssessmentStapper } from './pre-checkin-assessment-stepper/pre-checkin-assessment-stapper'

const PreCheckinAssessmentView = async () => {
  const codesets = await getCodesets([CODESETS.Gender])

  return (
    <CodesetStoreProvider codesets={codesets}>
      <Box className="mx-auto">
        <PreCheckinAssessmentStapper />
      </Box>
    </CodesetStoreProvider>
  )
}

export { PreCheckinAssessmentView }
