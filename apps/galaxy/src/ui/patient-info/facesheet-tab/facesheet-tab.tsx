'use client'

import { useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import {
  Appointment,
  Facesheet,
  FacesheetRecordStatus,
  PatientProfile,
} from '@/types'
import { TabContentHeading } from '../shared'
import { FacesheetTable } from './facesheet-table'
import { FacesheetUploadDialog } from './facesheet-upload-dialog'

const TAB_TITLE = 'Facesheet'
interface FacesheetTabProps {
  patientFacesheet: Facesheet[]
  patientProfile: PatientProfile
  patientVisits: Appointment[]
}

const FacesheetTab = ({
  patientFacesheet,
  patientProfile,
  patientVisits,
}: FacesheetTabProps) => {
  const [facesheets, setFacesheets] = useState(
    patientFacesheet.map((facesheet) => ({
      ...facesheet,
      legalName: patientProfile.legalName,
    })),
  )

  const handleUploadSuccess = (newFacesheet: Facesheet) => {
    setFacesheets((prev) => [
      { ...newFacesheet, legalName: patientProfile.legalName },
      ...prev,
    ])
  }
  const handleUpdateStatus = (facesheetId: string, status: string) => {
    setFacesheets((prev) =>
      prev.map((facesheet) =>
        facesheet.id === facesheetId
          ? { ...facesheet, recordStatus: status as FacesheetRecordStatus }
          : facesheet,
      ),
    )
  }

  const handleVisitSelect = (newFacesheet: Facesheet) => {
    setFacesheets((prev) =>
      prev.map((facesheet) =>
        facesheet.id === newFacesheet.id ? newFacesheet : facesheet,
      ),
    )
  }

  const filteredPatientVisits = patientVisits.map(
    ({
      appointmentId,
      appointmentEncounterNo,
      facilityAdmissionDetailId,
      facilityAdmissionId,
    }) => ({
      appointmentId,
      appointmentEncounterNo,
      facilityAdmissionDetailId,
      facilityAdmissionId,
    }),
  )

  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title={TAB_TITLE}>
        <Flex gap="2" align="center" className="flex-1" justify="end">
          <FacesheetUploadDialog
            patientId={patientProfile.id.toString()}
            onUploadSuccess={handleUploadSuccess}
          />
        </Flex>
      </TabContentHeading>
      <ScrollArea>
        <Flex
          direction="column"
          gap="1"
          pl="2"
          className="bg-white h-[calc(100dvh_-_390px)] w-full py-1"
        >
          <FacesheetTable
            facesheets={facesheets}
            patientVisits={filteredPatientVisits}
            handleUpdateStatus={handleUpdateStatus}
            onVisitSelect={handleVisitSelect}
          />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { FacesheetTab }
