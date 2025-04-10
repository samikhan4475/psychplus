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
import { GetPatientNotesResponse, Tabs } from './types'

interface NotesViewProps {
  patientId?: string
  noteAppointment?: Appointment
  patientNotes: GetPatientNotesResponse | undefined
  PatientProfile?: PatientProfile
  allergies?: Allergy[]
  loading: boolean
  isInboxNotes: boolean
  tab?: string
}

const NotesWidget = ({
  patientId,
  noteAppointment,
  patientNotes,
  PatientProfile,
  allergies,
  loading,
  isInboxNotes,
  tab,
}: NotesViewProps) => {
  const {
    appointment,
    selectedRow,
    setSelectedRow,
    isCreateNoteView,
    setPatientId,
    setTab,
    setData,
    setPatient,
    setAllergies,
    setAppointmentId,
    setIsInboxNotes,
    setLoadingDetail,
    setLoading,
    fetchAppointment,
    fetchWidgets,
    fetchNoteDetail,
    fetchAppointments,
    fetchPatient,
    fetchPatientAllergies,
    fetchAddendumsDetails,
  } = useStore((state) => ({
    isCreateNoteView: state.isCreateNoteView,
    appointment: state.appointment,
    selectedRow: state.selectedRow,
    setSelectedRow: state.setSelectedRow,
    setPatientId: state.setPatientId,
    setTab: state.setTab,
    setData: state.setData,
    setPatient: state.setPatient,
    setIsInboxNotes: state.setIsInboxNotes,
    setAllergies: state.setAllergies,
    setAppointmentId: state.setAppointmentId,
    setAppointment: state.setAppointment,
    setLoadingDetail: state.setLoadingDetail,
    setLoading: state.setLoading,
    fetchNoteDetail: state.fetchNoteDetail,
    fetchAppointments: state.fetchAppointments,
    fetchPatient: state.fetchPatient,
    fetchPatientAllergies: state.fetchPatientAllergies,
    fetchAppointment: state.fetchAppointment,
    fetchWidgets: state.fetchWidgets,
    fetchAddendumsDetails: state.fetchAddendumsDetails,
  }))

  useEffect(() => {
    setData(patientNotes)
    setTab(tab)
    if (patientId && PatientProfile && allergies) {
      setPatientId(patientId)
      setPatient(PatientProfile)
      setAllergies(allergies)
    }
    setIsInboxNotes(isInboxNotes)
    setLoading(loading)
  }, [patientNotes])

  useEffect(() => {
    setSelectedRow(undefined)
  }, [patientId, patientNotes])

  useEffect(() => {
    const fetchData = async () => {
      if (selectedRow) {
        const payload = {
          patientId: selectedRow.patientId,
          appointmentId: selectedRow?.appointmentId,
          isIncludeDetails: true,
          encounterSignedNoteQueryFilters: {
            encounterNoteId: selectedRow?.id,
          },
        }
        setPatientId(selectedRow.patientId)
        setAppointmentId(selectedRow.appointmentId)
        setLoadingDetail(true)
        const promises = [
          fetchNoteDetail(payload),
          fetchAppointment(selectedRow.appointmentId),
        ]
        if (selectedRow.notePositionCode !== 'Secondary') {
          promises.push(
            fetchAppointments(selectedRow.patientId, selectedRow.appointmentId),
          )
        }

        if (isInboxNotes) {
          promises.push(
            fetchPatientAllergies(selectedRow.patientId),
            fetchPatient(selectedRow.patientId),
          )
        }

        await Promise.all(promises)
        fetchAddendumsDetails(
          selectedRow.patientId,
          selectedRow?.appointmentId,
          selectedRow?.id,
        )
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

  let heading
  if (tab) {
    heading =
      tab === Tabs.PENDING_NOTES ? 'Pending Notes' : 'Pending Cosigner Note'
  } else {
    heading = 'Notes'
  }

  return (
    <Flex direction="column" width="100%" px="1">
      {noteAppointment && isCreateNoteView ? (
        <CreateNoteView noteAppointment={noteAppointment} />
      ) : (
        <>
          <NotesHeader noteAppointment={noteAppointment} heading={heading} />
          <NotesLayout patientId={patientId} isInboxNotes={isInboxNotes} />
        </>
      )}
      <AlertDialog />
    </Flex>
  )
}

export { NotesWidget }
