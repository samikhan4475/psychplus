'use client'

import { QuickNoteSectionItem } from '@/types'
import { HospitalDischargeTab } from './hospital-discharge-tab'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useEffect, useState } from 'react'
import { LoadingPlaceholder } from '@/components'

interface HospitalDischargeWidgetProps {
  patientId: string
  isHospitalDischargeTab?: boolean
  data?: QuickNoteSectionItem[]
}

const HospitalDischargeClientLoader = ({
  patientId,
  isHospitalDischargeTab = false,
  data,
}: HospitalDischargeWidgetProps) => {
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

  if (loading) return <LoadingPlaceholder className="bg-white" />
  return (
    <HospitalDischargeTab
      patientId={patientId}
      isHospitalDischargeTab={isHospitalDischargeTab}
      hospitalDischargeData={data ?? []}
      hospitalInitialData={hospitalInitialData}
    />
  )
}

export { HospitalDischargeClientLoader }
