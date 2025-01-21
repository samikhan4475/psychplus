import { PropsWithChildren } from 'react'
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components/loading-placeholder'
import { getPatientFullName, getSlashedDateString } from '@/utils'
import { useStore } from '../store'
import { groupBySectionName } from '../utils'
import { CreateNoteDetailView } from './create-note-detail-view'

const NoteDetail = ({ children }: PropsWithChildren) => {
  const {
    loadingDetail,
    noteDetail,
    appointments,
    allergies,
    appointment,
    patientId,
    appointmentId,
    widgets,
    patient,
    provider,
    selectedRow,
  } = useStore((state) => ({
    loadingDetail: state.loadingDetail,
    patient: state.patient,
    noteDetail: state.noteDetail,
    appointments: state.appointments,
    appointment: state.appointment,
    allergies: state.allergies,
    patientId: state.patientId,
    appointmentId: state.appointmentId,
    widgets: state.widgets,
    provider: state.provider,
    selectedRow: state.selectedRow,
  }))

  const groupedData = noteDetail ? groupBySectionName(noteDetail) : {}
  if (loadingDetail) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  let providerName
  if (provider) {
    providerName = getPatientFullName(provider?.legalName)
  }

  return (
    <Flex
      gap="1"
      p="2"
      className="bg-white px-2 py-3"
      direction="column"
      id="note-view-print"
    >
      {groupedData['CreateNote']?.length > 0 ? (
        <CreateNoteDetailView data={groupedData['CreateNote']} />
      ) : (
        widgets.map(
          ({ id, actualNoteDetailComponent: ActualNoteDetailComponent }) => {
            if (!ActualNoteDetailComponent) return null

            const dataForWidget = groupedData[id] || []
            return (
              <Box key={id}>
                <ActualNoteDetailComponent
                  data={dataForWidget}
                  appointments={appointments}
                  allergies={allergies}
                  appointment={appointment}
                  patientId={patientId}
                  appointmentId={appointmentId}
                  patient={patient}
                  groupedData={groupedData}
                  visitSequence={selectedRow?.visitSequence ?? ''}
                  visitType={selectedRow?.visitTypeCode ?? ''}
                />
              </Box>
            )
          },
        )
      )}
      <Box>{children}</Box>

      {noteDetail?.[0]?.addendum && (
        <Flex gap="1" direction="column">
          <Heading size="3">Addendum</Heading>
          <Text size="1">
            {noteDetail?.[0]?.addendum?.signerDescription ?? ''}
          </Text>
          <Separator className="w-full" mt="1" />
        </Flex>
      )}

      {noteDetail?.[0]?.signedDate && (
        <Heading size={'3'} my={'1'} weight={'medium'}>
          E-Signed by: {providerName}, {provider?.legalName?.honors ?? ''} at{' '}
          {noteDetail?.[0]?.signedDate
            ? getSlashedDateString(noteDetail?.[0]?.signedDate)
            : ''}
        </Heading>
      )}
    </Flex>
  )
}

export { NoteDetail }
