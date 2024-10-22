'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { SelectOptionType } from '@/types'
import { getPracticesOptionsAction } from './actions'
import { PatientFilterForm } from './patient-filter-form'
import { PatientLookupHeader } from './patient-header'
import { PatientLookupTable } from './patient-lookup-table'
import { PatientLookupTablePagination } from './patient-lookup-table-pagination'

const PatientLookupView = () => {
  const [practicesOptions, setPracticesOptions] = useState<SelectOptionType[]>(
    [],
  )
  useEffect(() => {
    getPracticesOptionsAction().then((practiceResult) => {
      if (practiceResult.state === 'success') {
        setPracticesOptions(practiceResult.data)
      }
    })
  }, [])

  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <PatientLookupHeader />
      <PatientFilterForm practicesOptions={practicesOptions} />
      <Flex direction="column" className="bg-white flex-1 !overflow-hidden">
        <PatientLookupTable practicesOptions={practicesOptions} />
        <PatientLookupTablePagination />
      </Flex>
    </Flex>
  )
}

export { PatientLookupView }
