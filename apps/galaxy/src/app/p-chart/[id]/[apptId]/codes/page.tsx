import { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { CodesView } from '@/ui/codes'

interface CodesVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
  }
}

const CodesVisitViewPage = ({
  params,
  searchParams,
}: CodesVisitViewPageProps) => {
  return (
    <Suspense
      fallback={
        <Flex
          direction="column"
          align="center"
          justify="center"
          flexGrow="1"
          className="h-full"
        >
          <LoadingPlaceholder />
        </Flex>
      }
    >
      <CodesView
        patientId={params.id}
        appointmentId={searchParams.id}
        isCodesHeader={true}
      />
    </Suspense>
  )
}

export default CodesVisitViewPage
