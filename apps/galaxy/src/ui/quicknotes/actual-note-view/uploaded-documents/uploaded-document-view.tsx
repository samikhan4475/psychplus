import { getAllDocumentsAction } from '@/ui/uploaded-documents/actions'
import { Text } from '@radix-ui/themes'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type UploadedDocumentProps = {
  patientId: string
  appointmentId: string
}

const UploadedDocumentView = async ({ patientId, appointmentId }: UploadedDocumentProps) => {
  const response = await getAllDocumentsAction({
    data: {
      appointmentId: Number(appointmentId),
      patientId: Number(patientId),
      documentType: 'Primary',
    },
    patientId: Number(patientId),
    appointmentId: Number(appointmentId),
  });

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionUploadedDocuments}
    >
      <Details data={response.data} appointmentId={appointmentId} patientId={patientId} />
    </ActualNoteDetailsWrapper>
  )
}

export { UploadedDocumentView }
