import { Text } from '@radix-ui/themes'
import { AlertDialog } from '../assessment-plan/alert-dialog'
import { getAllDocumentsAction } from './actions'
import { UploadedDocumentTab } from './uploaded-documents-tab'

interface UploadedDocumentsWidgetProps {
  patientId: string
  appointmentId?: string
}

const UploadedDocumentsWidget = async ({
  patientId,
  appointmentId
}: UploadedDocumentsWidgetProps) => {
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
    <>
      <UploadedDocumentTab
        patientId={patientId}
        uploadedDocumentsData={response.data}
      />
      <AlertDialog />
    </>
  )
}

export { UploadedDocumentsWidget }
