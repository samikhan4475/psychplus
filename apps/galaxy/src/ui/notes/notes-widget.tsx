'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { Appointment, PatientProfile } from '@/types'
import { Allergy } from '../quicknotes/actual-note-view/types'
import { AlertDialog } from './alert-dialog'
import { CreateNoteView } from './create-note'
import { NotesHeader } from './notes-header'
import { NotesLayout } from './notes-layout'
import { useStore } from './store'
import { PatientNotes } from './types'

interface NotesViewProps {
  patientId: string
  noteAppointment?: Appointment
  patientNotes: PatientNotes[]
  PatientProfile: PatientProfile
  allergies: Allergy[]
}

const NotesWidget = ({
  patientId,
  noteAppointment,
  patientNotes,
  PatientProfile,
  allergies,
}: NotesViewProps) => {
  const {
    appointment,
    selectedRow,
    isCreateNoteView,
    setPatientId,
    setData,
    setPatient,
    setAllergies,
    setAppointmentId,
    setLoadingDetail,
    fetchAppointment,
    fetchWidgets,
    fetchNoteDetail,
    fetchAppointments,
    fetchAddendumsDetails,
  } = useStore((state) => ({
    isCreateNoteView: state.isCreateNoteView,
    appointment: state.appointment,
    selectedRow: state.selectedRow,
    setPatientId: state.setPatientId,
    setData: state.setData,
    setPatient: state.setPatient,
    setAllergies: state.setAllergies,
    setAppointmentId: state.setAppointmentId,
    setAppointment: state.setAppointment,
    setLoadingDetail: state.setLoadingDetail,
    fetchNoteDetail: state.fetchNoteDetail,
    fetchAppointments: state.fetchAppointments,
    fetchAppointment: state.fetchAppointment,
    fetchWidgets: state.fetchWidgets,
    fetchAddendumsDetails: state.fetchAddendumsDetails,
  }))

  useEffect(() => {
    setData({ notes: patientNotes })
    setPatientId(patientId)
    setPatient(PatientProfile)
    setAllergies(allergies)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (selectedRow) {
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
        const promises = [
          fetchNoteDetail(payload),
          fetchAppointment(selectedRow.appointmentId),
          fetchAddendumsDetails(
            patientId,
            selectedRow?.appointmentId,
            selectedRow?.id,
          ),
        ]
        if (selectedRow.notePositionCode !== 'Secondary') {
          promises.push(fetchAppointments(patientId, selectedRow.appointmentId))
        }

        await Promise.all(promises)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow])

  useEffect(() => {
    const fetchData = async () => {
      if (
        selectedRow &&
        appointment &&
        selectedRow.notePositionCode !== 'Secondary'
      ) {
        fetchWidgets({
          visitType: selectedRow.visitTypeCode ?? '',
          visitSequence: selectedRow.visitSequence ?? '',
          providerType: appointment.providerType ?? '',
        })
      }
      setLoadingDetail(false)
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
