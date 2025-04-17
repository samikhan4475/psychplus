'use client'

import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AimsView } from './aims-view'
import { questionnaireViewConstants } from './constant'
import { CssrsView } from './cssrs-view'
import { MocaView } from './moca-view'
import { QuestionnaireViewCommon } from './questionnaires-view'
import { SnapIvView } from './snap-iv-view'
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
      currentQuestionnaire.scoreRange,
  )

  const renderView = () => {
    switch (sectionName) {
      case 'QuicknoteSectionQuestionnaireSnapIV':
        return <SnapIvView data={data} />
      case 'QuicknoteSectionQuestionnaireYbocs':
        return <YBocView data={data} />
      case 'QuicknoteSectionQuestionnaireAims':
        return <AimsView data={data} />
      case 'QuicknoteSectionQuestionnaireMoca':
        return <MocaView data={data} />
      case 'QuicknoteSectionQuestionnaireCssrs':
        return <CssrsView data={data} />
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
