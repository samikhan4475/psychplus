import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { FillOutTabsView } from '@/ui/questionnaires/shared'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutSnap4 } from './fill-out-snap4'
import { FilloutAims } from './fill-out-view-aims'
import { FilloutCommon } from './fill-out-view-common'
import { FilloutMoca } from './fill-out-view-moca'
import { FilloutYboc } from './fill-out-yboc'

type FillOutProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
  sectionName: QuickNoteSectionName
}>

const FillOutView = ({ data, sectionName }: FillOutProps) => {
  const renderView = () => {
    switch (sectionName) {
      case 'QuicknoteSectionQuestionnaireSnapIV':
        return <FilloutSnap4 data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnaireYbocs':
        return <FilloutYboc data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnaireAims':
        return <FilloutAims data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnaireMoca':
        return <FilloutMoca data={data} sectionName={sectionName} />
      default:
        return <FilloutCommon data={data} sectionName={sectionName} />
    }
  }

  return (
    <FillOutTabsView sectionName={sectionName}>
      {renderView()}
    </FillOutTabsView>
  )
}

export { FillOutView }
