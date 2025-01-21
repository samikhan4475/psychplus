'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { AlertDialog } from './alert-dialog'
import { CreateNoteView } from './create-note'
import { NotesHeader } from './notes-header'
import { NotesLayout } from './notes-layout'
import { useStore } from './store'

interface NotesViewProps {
  patientId: string
  noteAppointment?: Appointment
}

const NotesWidget = ({ patientId, noteAppointment }: NotesViewProps) => {
  const {
    appointment,
    selectedRow,
    isCreateNoteView,
    noteDetail,
    setPatientId,
    setAppointmentId,
    setLoadingDetail,
    fetchAppointment,
    fetchWidgets,
    fetchPatient,
    fetchNoteDetail,
    fetchAllergies,
    fetchAppointments,
    fetchDocuments,
    fetchStaff,
    fetchProvider,
    fetchAddendumsDetails,
  } = useStore((state) => ({
    isCreateNoteView: state.isCreateNoteView,
    appointment: state.appointment,
    selectedRow: state.selectedRow,
    noteDetail: state.noteDetail,
    setPatientId: state.setPatientId,
    setAppointmentId: state.setAppointmentId,
    setAppointment: state.setAppointment,
    setLoadingDetail: state.setLoadingDetail,
    fetchNoteDetail: state.fetchNoteDetail,
    fetchAllergies: state.fetchAllergies,
    fetchAppointments: state.fetchAppointments,
    fetchAppointment: state.fetchAppointment,
    fetchWidgets: state.fetchWidgets,
    fetchPatient: state.fetchPatient,
    fetchDocuments: state.fetchDocuments,
    fetchStaff: state.fetchStaff,
    fetchProvider: state.fetchProvider,
    fetchAddendumsDetails: state.fetchAddendumsDetails,
  }))

  useEffect(() => {
    const fetchData = async () => {
      setPatientId(patientId)
      if (selectedRow) {
        console.log(selectedRow, 'selectedRowselectedRowselectedRow')
        const payload = {
          patientId: patientId,
          appointmentId: selectedRow?.appointmentId,
          isIncludeDetails: true,
          encounterSignedNoteQueryFilters: {
            encounterNoteId: selectedRow?.id,
          },
        }
        setAppointmentId(selectedRow.appointmentId)
        setLoadingDetail(true)
        await Promise.all([
          fetchNoteDetail(payload),
          fetchAllergies(patientId),
          fetchPatient(patientId),
          fetchAppointments(patientId, selectedRow.appointmentId),
          fetchAppointment(selectedRow.appointmentId),
          fetchDocuments(patientId, selectedRow.appointmentId),
          fetchAddendumsDetails(
            patientId,
            selectedRow?.appointmentId,
            selectedRow?.id,
          ),
        ])
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow])

  useEffect(() => {
    const fetchData = async () => {
      if (selectedRow && appointment && noteDetail) {
        await Promise.all([
          fetchWidgets({
            visitType: selectedRow.visitTypeCode ?? '',
            visitSequence: selectedRow.visitSequence ?? '',
            providerType: appointment.providerType ?? '',
          }),
          fetchStaff(noteDetail[0]?.coSignedByUserId),
          fetchProvider(noteDetail[0]?.signedByUserId),
        ])
        setLoadingDetail(false)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment])

  return (
    <Flex direction="column" width="100%" px="1">
      {noteAppointment && isCreateNoteView ? (
        <CreateNoteView noteAppointment={noteAppointment} />
      ) : (
        <>
          <NotesHeader noteAppointment={noteAppointment} />
          <NotesLayout patientId={patientId} />
        </>
      )}
      <AlertDialog />
    </Flex>
  )
}

export { NotesWidget }
