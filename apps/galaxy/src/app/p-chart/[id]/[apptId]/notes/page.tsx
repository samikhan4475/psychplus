import { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { NotesWidgetView } from '@/ui/notes'

interface NotesVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
  }
}

const NotesVisitViewPage = ({
  params,
  searchParams,
}: NotesVisitViewPageProps) => {
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
      <NotesWidgetView patientId={params.id} appointmentId={searchParams.id} />
    </Suspense>
  )
}

export default NotesVisitViewPage
