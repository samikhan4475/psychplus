import { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { QuickNotesView } from '@/ui/quicknotes'

export const dynamic = 'force-dynamic'
export const revalidate = 0
interface QuickNotesVisitViewPageProps {
  params: {
    id: string
    apptId:string
  }
  searchParams: {
    id: string
    visitType: string
    visitSequence: string
  }
}

const QuickNotesVisitViewPage = ({
  params,
  searchParams: { id, visitType, visitSequence },
}: QuickNotesVisitViewPageProps) => (
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
    <QuickNotesView
      patientId={params.id}
      appointmentId={id}
      visitType={visitType}
      visitSequence={visitSequence}
    />
  </Suspense>
)

export default QuickNotesVisitViewPage
 