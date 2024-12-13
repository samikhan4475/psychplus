'use server'

import * as api from '@/api'
import { VisitPayload, VisitsList } from '../types'

interface VisitsListParams {
  staffId: number
  payload?: VisitPayload
}

const getVisitsListAction = async ({
  payload,
}: VisitsListParams): Promise<api.ActionResult<VisitsList[]>> => {
  const mockVisitsList: VisitsList[] = [
    {
      dateTime: '2024-11-21T14:30:00Z',
      patientName: 'John Doe',
      gender: 'Male',
      DOB: '1985-06-15',
      MRN: 'MRN123456789',
      visitId: 'VISIT001',
      location: 'Room 101, Main Hospital',
      visitType: 'Consultation',
      visitStatus: 'Completed',
    },
    {
      dateTime: '2024-11-22T09:00:00Z',
      patientName: 'Jane Smith',
      gender: 'Female',
      DOB: '1990-02-22',
      MRN: 'MRN987654321',
      visitId: 'VISIT002',
      location: 'Room 203, East Wing',
      visitType: 'Follow-up',
      visitStatus: 'Pending',
    },
    {
      dateTime: '2024-11-22T11:15:00Z',
      patientName: 'Michael Johnson',
      gender: 'Male',
      DOB: '1978-11-11',
      MRN: 'MRN456789123',
      visitId: 'VISIT003',
      location: 'Room 305, West Wing',
      visitType: 'Emergency',
      visitStatus: 'In Progress',
    },
    {
      dateTime: '2024-11-22T16:45:00Z',
      patientName: 'Emily Davis',
      gender: 'Female',
      DOB: '1995-03-30',
      MRN: 'MRN567890234',
      visitId: 'VISIT004',
      location: 'Room 105, North Wing',
      visitType: 'Consultation',
      visitStatus: 'Completed',
    },
    {
      dateTime: '2024-11-23T08:00:00Z',
      patientName: 'Christopher Lee',
      gender: 'Male',
      DOB: '1982-09-17',
      MRN: 'MRN654321987',
      visitId: 'VISIT005',
      location: 'Room 402, South Wing',
      visitType: 'Check-up',
      visitStatus: 'Canceled',
    },
  ]

  return {
    state: 'success',
    data: mockVisitsList,
  }
}

export { getVisitsListAction }
