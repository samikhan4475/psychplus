'use client'

import { DataTable } from '@/components'
import { Box, ScrollArea } from '@radix-ui/themes'
import { columns } from './columns'
import { Users } from './types'

const OrganizationUserTable = () => {
  const dummyData: Users[] = [
    {
      id: '1',
      name: 'John Doe',
      referralDate: new Date().toISOString(),
      ptStatus: 'Active',
      p: "Yes",
      pElapsed: "21970",
      i: "No",
      iElapsed: "29710",
      pc: "Yes",
      cc: "No",
      age: 34,
      gen: 'M',
      mrn: '123456',
      dob: '1989-05-15',
      phone: '+123456789',
      email: 'johndoe@example.com',
      ss: 'XXX-XX-1234',
      residenceState: 'California',
      city: 'Los Angeles',
      zip: '90001',
      guardian: 'Jane Doe',
      organization: 'HealthCare Org',
      practice: 'General Practice',
      insurance: 'ABC Insurance',
      userCreated: 'Admin',
      createdBy: 'Dr. Smith',
      nextVisit: '2024-12-20T10:00:00Z',
      visitHx: 'Routine Checkup',
      contactInitiated: 'Yes',
      service: 'Medical Checkup',
      servicesStatus: 'Scheduled',
      referredByName: 'Dr. Adams',
      visitDateTime: '2024-12-15T09:00:00Z',
      comments: 'Patient referred for follow-up checkup.',
    },
    {
      id: '2',
      name: 'Jane Smith',
      referralDate: new Date().toISOString(),
      ptStatus: 'Pending',
      p: "Yes",
      pElapsed: "21970",
      i: "No",
      iElapsed: "29710",
      pc: "Yes",
      cc: "No",
      age: 29,
      gen: 'F',
      mrn: '654321',
      dob: '1994-02-20',
      phone: '+987654321',
      email: 'janesmith@example.com',
      ss: 'XXX-XX-4321',
      residenceState: 'New York',
      city: 'New York',
      zip: '10001',
      guardian: 'N/A',
      organization: 'MediCare Center',
      practice: 'Pediatrics',
      insurance: 'XYZ Insurance',
      userCreated: 'Nurse John',
      createdBy: 'Dr. Brown',
      nextVisit: '2024-12-25T14:00:00Z',
      visitHx: 'Vaccination',
      contactInitiated: 'No',
      service: 'Immunization',
      servicesStatus: 'Pending',
      referredByName: 'Clinic Referral',
      visitDateTime: '2024-12-22T11:00:00Z',
      comments: 'Patient needs to complete vaccination schedule.',
    },
  ]

  return (
    <Box className='bg-white p-2 mt-1 overflow-hidden'>
      <ScrollArea>
        <DataTable
          data={dummyData}
          columns={columns}
          tableRowClass="relative"
          tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
          disablePagination
          isRowSpan
          sticky
        />
      </ScrollArea>
    </Box>
  )
}

export { OrganizationUserTable }
