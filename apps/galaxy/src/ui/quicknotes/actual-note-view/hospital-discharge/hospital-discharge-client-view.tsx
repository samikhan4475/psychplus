'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/hospital/hospital-discharge-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'
import { useEffect, useState } from 'react'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { LoadingPlaceholder } from '@/components'

type HospitalDischargeProps = {
  data?: QuickNoteSectionItem[]
  initialData?: QuickNoteSectionItem[]
  patientId: string
}

const HospitalDischargeClientView = ({ data, patientId }: HospitalDischargeProps) => {
  const [hospitalInitialData, setHospitalInitialData] = useState<QuickNoteSectionItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHospitalInitialData = async () => {
      const response = await getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuickNoteSectionHospitalInitial,
      ])
      if (response.state === 'success')
        setHospitalInitialData(response.data)
      setLoading(false)
    }

    fetchHospitalInitialData()
  }, [patientId])

  if (loading) return <LoadingPlaceholder className='bg-white'  />
  
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionHospitalDischarge}
    >
      <Details data={transformIn(data ?? [], hospitalInitialData ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { HospitalDischargeClientView }
