import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { FillOutTabsView } from '@/ui/questionnaires/shared'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutAdultAsrs } from './fill-out-adult-asrs'
import { FilloutDesii } from './fill-out-des-ii'
import { FilloutGqAsc } from './fill-out-gq-asc'
import { FilloutPsc17 } from './fill-out-psc-17'
import { FilloutSnap4 } from './fill-out-snap4'
import { FilloutAims } from './fill-out-view-aims'
import { FilloutCommon } from './fill-out-view-common'
import { FilloutCssrs } from './fill-out-view-cssrs'
import { FilloutMoca } from './fill-out-view-moca'
import { FilloutYboc } from './fill-out-yboc'
import { FilloutVadprs } from './fill-out-vadprs'

type FillOutProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
  sectionName: QuickNoteSectionName
}>

const FillOutView = ({ data, sectionName }: FillOutProps) => {
  const renderView = () => {
    switch (sectionName) {
      case 'QuicknoteSectionQuestionnaireSnapIV':
        return <FilloutSnap4 data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnairePsc17':
        return <FilloutPsc17 data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnaireYbocs':
        return <FilloutYboc data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnaireAims':
        return <FilloutAims data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnaireMoca':
        return <FilloutMoca data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnaireCssrs':
        return <FilloutCssrs data={data} sectionName={sectionName} />
      case 'QuicknoteSectionQuestionnaireAdultAsrs':
        return <FilloutAdultAsrs data={data} sectionName={sectionName} />
        case 'QuicknoteSectionQuestionnaireVadprs':
          return <FilloutVadprs data={data} sectionName={sectionName} />
      case QuickNoteSectionName.QuickNoteSectionGqasc:
        return <FilloutGqAsc data={data} sectionName={sectionName} />
      case QuickNoteSectionName.QuickNoteSectionDesii:
        return <FilloutDesii data={data} sectionName={sectionName} />
      default:
        return <FilloutCommon data={data} sectionName={sectionName} />
    }
  }

  return (
    <FillOutTabsView sectionName={sectionName}>{renderView()}</FillOutTabsView>
  )
}

export { FillOutView }
