'use client'

import { DataTable } from '@/components'
import { ScrollArea } from '@radix-ui/themes'
import { columns } from './history-columns'
import { Users } from './types'

const OrganizationUserHistoryTable = () => {
  const dummyData: Users[] = [
    {
      id: '1',
      name: 'John Doe',
      age: 34,
      gen: 'M',
      dob: '1989-05-15',
      phone: '+123456789',
      email: 'johndoe@example.com',
      ss: 'XXX-XX-1234',
      city: 'Los Angeles',
      zip: '90001',
      guardian: 'Jane Doe',
      residenceState: 'California',
      ptStatus: 'Active',
      ptVerification: 'Active',
      contactInitiated: 'Yes',
      updatedDate: new Date().toISOString(),
      updatedBy: 'Bessie Cooper',
    },
    {
      id: '2',
      name: 'John Doe',
      age: 34,
      gen: 'M',
      dob: '1989-05-15',
      phone: '+123456789',
      email: 'johndoe@example.com',
      ss: 'XXX-XX-1234',
      city: 'Los Angeles',
      zip: '90001',
      guardian: 'Jane Doe',
      residenceState: 'California',
      ptStatus: 'Active',
      ptVerification: 'Active',
      contactInitiated: 'Yes',
      updatedDate: new Date().toISOString(),
      updatedBy: 'Bessie Cooper',
    },
  ]

  return (
    <ScrollArea scrollbars="both" className="bg-white h-full p-2">
      <DataTable
        data={dummyData}
        columns={columns}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        tableRowClass="relative"
        theadClass="z-[1]"
        disablePagination
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { OrganizationUserHistoryTable }
