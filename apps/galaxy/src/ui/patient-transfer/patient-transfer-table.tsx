'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { PatientTransfer } from './types'

const PatientTransferTable = () => {
  const [loading,] = useState(false)

  useEffect(() => {
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  const Data: PatientTransfer[] = [
    {
      firstName: 'Emily',
      middleName: 'Rose',
      lastName: 'Johnson',
      dateOfBirth: '04/12/1990',
      age: '34',
      gender: 'F',
      guardian: 'Sarah Johnson',
      phone: 1234567890,
      email: 'emily.johnson@example.com',
      last4ss: '6789',
      legal: 'Voluntary',
      insurance: 'UnitedHealthcare',
      linked: 'Yes',
      facesheet: 'https://example.com/files/facesheet-emily.pdf',
      details: 'Patient has a history of asthma and anxiety.',
      documents: 'https://example.com/files/documents-emily.zip',
      transferingLocation: 'Downtown Medical Center',
      transferingNurse: 'Nurse James',
      transferingNursePhoneNumber: '555-123-4567',
      acceptingLocation: 'Sunrise Recovery Unit',
      acceptingNurse: 'Nurse Clara',
      acceptingNursePhoneNumber: '555-987-6543',
      service: 'Behavioral Health',
      transferingFacility: 'Approved',
      acceptingFacility: 'Pending',
      user: 'admin',
      date: '08/07/25',
      timeElapsed: '00:00',
    },
    {
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Johnson',
      dateOfBirth: '04/12/1990',
      age: '34',
      gender: 'F',
      guardian: 'Sarah Johnson',
      phone: 1234567890,
      email: 'emily.johnson@example.com',
      last4ss: '6789',
      legal: 'Voluntary',
      insurance: 'UnitedHealthcare',
      linked: 'Yes',
      facesheet: 'https://example.com/files/facesheet-emily.pdf',
      details: 'Patient has a history of asthma and anxiety.',
      documents: 'https://example.com/files/documents-emily.zip',
      transferingLocation: 'Downtown Medical Center',
      transferingNurse: 'Nurse James',
      transferingNursePhoneNumber: '555-123-4567',
      acceptingLocation: 'Sunrise Recovery Unit',
      acceptingNurse: 'Nurse Clara',
      acceptingNursePhoneNumber: '555-987-6543',
      service: 'Behavioral Health',
      transferingFacility: 'Pending',
      acceptingFacility: 'Canceled',
      user: 'admin',
      date: '08/07/25',
      timeElapsed: '00:00',
    },
  ]

  return (
    <ScrollArea className="h-full p-2">
      <DataTable
        data={Data}
        columns={columns()}
        disablePagination
        sticky
        isRowSpan
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { PatientTransferTable }
