'use client'

import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AdultAsrsView } from './adult-asrs-view'
import { AimsView } from './aims-view'
import { CarsStView } from './cars-2-st-view'
import { questionnaireViewConstants } from './constant'
import { CssrsView } from './cssrs-view'
import { DesiiView } from './des-ii-view'
import { GqAscView } from './gq-asc-view'
import { MdqView } from './mdq-view'
import { MocaView } from './moca-view'
import { Psc17View } from './psc-17-view'
import { QuestionnaireViewCommon } from './questionnaires-view'
import { SnapIvView } from './snap-iv-view'
import { TograBlueView } from './togra-blue-view'
import { VadprsView } from './vadprs-view'
import { YBocView } from './y-boc-view'

interface QuestionnaireDetailViewProps {
  data: QuickNoteSectionItem[]
  sectionName: QuickNoteSectionName
}

const QuestionnaireDetailView = ({
  data,
  sectionName,
}: QuestionnaireDetailViewProps) => {
  const currentQuestionnaire = questionnaireViewConstants(sectionName)
  const hasOtherQuestionnaire = Boolean(
    currentQuestionnaire.questions &&
      currentQuestionnaire.labels &&
      (currentQuestionnaire.scoreRange || currentQuestionnaire?.pagination),
  )

  const renderView = () => {
    switch (sectionName) {
      case 'QuicknoteSectionQuestionnaireSnapIV':
        return <SnapIvView data={data} />
      case 'QuicknoteSectionQuestionnairePsc17':
        return <Psc17View data={data} />
      case 'QuicknoteSectionQuestionnaireYbocs':
        return <YBocView data={data} />
      case 'QuicknoteSectionQuestionnaireAims':
        return <AimsView data={data} />
      case 'QuicknoteSectionQuestionnaireMoca':
        return <MocaView data={data} />
      case 'QuicknoteSectionQuestionnaireCssrs':
        return <CssrsView data={data} />
      case 'QuicknoteSectionQuestionnaireAdultAsrs':
        return <AdultAsrsView data={data} />
      case 'QuicknoteSectionQuestionnaireVadprs':
        return <VadprsView data={data} />
      case QuickNoteSectionName.QuickNoteSectionGqasc:
        return <GqAscView data={data} />
      case QuickNoteSectionName.QuickNoteSectionDesii:
        return <DesiiView data={data} />
      case QuickNoteSectionName.QuickNoteSectionCars2St:
        return <CarsStView data={data} />
      case QuickNoteSectionName.QuickNoteSectionMdq:
        return <MdqView data={data} />
      case QuickNoteSectionName.QuicknoteSectionTograBlue:
        return <TograBlueView data={data} />
      default:
        return null
    }
  }

  return (
    <>
      {hasOtherQuestionnaire && (
        <QuestionnaireViewCommon
          data={data}
          quickNoteSectionName={sectionName}
        />
      )}
      {renderView()}
    </>
  )
}

export { QuestionnaireDetailView }
