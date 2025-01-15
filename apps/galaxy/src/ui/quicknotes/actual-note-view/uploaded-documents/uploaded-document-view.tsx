import { Text } from '@radix-ui/themes'
import { getAllDocumentsAction } from '@/ui/uploaded-documents/actions'
import { Details } from './details'

type UploadedDocumentProps = {
  patientId: string
  appointmentId: string
}

const UploadedDocumentView = async ({
  patientId,
  appointmentId,
}: UploadedDocumentProps) => {
  const response = await getAllDocumentsAction({
    data: {
      appointmentId: Number(appointmentId),
      patientId: Number(patientId),
      documentType: 'Primary',
    },
    patientId: Number(patientId),
    appointmentId: Number(appointmentId),
  })

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <Details
      data={response.data}
      appointmentId={appointmentId}
      patientId={patientId}
    />
  )
}

export { UploadedDocumentView }
