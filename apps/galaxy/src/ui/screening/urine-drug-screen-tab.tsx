'use client'

import { useEffect, useState } from 'react'
import { genericEventBus } from '@/lib/generic-event-bus'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { UdsWidget } from '../uds'
import { getUrineDrugScreenAction } from './actions'

interface PsychiatryAssessmentPlanTabProps {
  patientId: string
  urineDrugScreenData: QuickNoteSectionItem[]
}

const UrineDrugScreenTab = ({
  patientId,
  urineDrugScreenData,
}: PsychiatryAssessmentPlanTabProps) => {
  const [data, setData] = useState(urineDrugScreenData)

  useEffect(() => {
    const handleUdsUpdated = async () => {
      const response = await getUrineDrugScreenAction({
        patientId,
        sectionName: QuickNoteSectionName.QuicknoteSectionUds,
      })
      if (response.state === 'success') {
        setData(response.data)
      }
    }

    genericEventBus.on('uds-updated-tab', handleUdsUpdated)

    return () => {
      genericEventBus.off('uds-updated-tab', handleUdsUpdated)
    }
  }, [patientId])

  return <UdsWidget patientId={patientId} data={data} isUdsTab={true} />
}

export { UrineDrugScreenTab }
