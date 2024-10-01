import { QuestionnairesView } from '@/ui/questionnaires'
import { getQuestionnairesDashboard } from '@/ui/questionnaires/dashboard-tab/api'
import { getQuestionnairesAims } from '@/ui/questionnaires/aims-tab/api'
import { getQuestionnairesAudit } from '@/ui/questionnaires/audit-tab/api'
import { getQuestionnairesDast10 } from '@/ui/questionnaires/dast-10-tab/api'
import { getQuestionnairesGad7 } from '@/ui/questionnaires/gad-7-tab/api/get-questionnaires-gad7'
import { getQuestionnairesHamD } from '@/ui/questionnaires/ham-d-tab/api'
import { getQuestionnairesMoca } from '@/ui/questionnaires/moca-tab/action'
import { getQuestionnairesPcl5 } from '@/ui/questionnaires/pcl-5-tab/api'
import { getQuestionnairesPhq9 } from '@/ui/questionnaires/phq-9-tab/api'
import { getQuestionnairesSnapIv } from '@/ui/questionnaires/snap-iv-tab/api'
import { getQuestionnairesYBocs } from '@/ui/questionnaires/y-bocs-tab/api'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const QuestionnairesInfoPage = async ({ params }: QuestionnairesPageProps) => {
  const [
    questionnairesDashboardResponse,
    questionnairesGad7Response,
    questionnairesPcl5Response,
    questionnairesPhq9Response,
    questionnairesSnapIvResponse,
    questionnairesYBocsResponse,
    questionnairesDast10Response,
    questionnairesAuditResponse,
    questionnairesAimsResponse,
    questionnairesHamDResponse,
    questionnairesMocaResponse,
  ] = await Promise.all([
    getQuestionnairesDashboard({ patientId: params.id }),
    getQuestionnairesGad7({ patientId: params.id }),
    getQuestionnairesPcl5({ patientId: params.id }),
    getQuestionnairesPhq9({ patientId: params.id }),
    getQuestionnairesSnapIv({ patientId: params.id }),
    getQuestionnairesYBocs({ patientId: params.id }),
    getQuestionnairesDast10({ patientId: params.id }),
    getQuestionnairesAudit({ patientId: params.id }),
    getQuestionnairesAims({ patientId: params.id }),
    getQuestionnairesHamD({ patientId: params.id }),
    getQuestionnairesMoca({ patientId: params.id }),
  ])

  if (questionnairesDashboardResponse.state === 'error') {
    throw new Error(questionnairesDashboardResponse.error)
  }

  if (questionnairesGad7Response.state === 'error') {
    throw new Error(questionnairesGad7Response.error)
  }

  if (questionnairesSnapIvResponse.state === 'error') {
    throw new Error(questionnairesSnapIvResponse.error)
  }
  if (questionnairesPcl5Response.state === 'error') {
    throw new Error(questionnairesPcl5Response.error)
  }

  if (questionnairesPhq9Response.state === 'error') {
    throw new Error(questionnairesPhq9Response.error)
  }

  if (questionnairesDast10Response.state === 'error') {
    throw new Error(questionnairesDast10Response.error)
  }
  if (questionnairesYBocsResponse.state === 'error') {
    throw new Error(questionnairesYBocsResponse.error)
  }

  if (questionnairesAuditResponse.state === 'error') {
    throw new Error(questionnairesAuditResponse.error)
  }
  if (questionnairesAimsResponse.state === 'error') {
    throw new Error(questionnairesAimsResponse.error)
  }
  if (questionnairesHamDResponse.state === 'error') {
    throw new Error(questionnairesHamDResponse.error)
  }
  if (questionnairesMocaResponse.state === 'error') {
    throw new Error(questionnairesMocaResponse.error)
  }

  return (
    <QuestionnairesView
      patientId={params.id}
      questionnairesDashboardData={
        questionnairesDashboardResponse.data.questionnairesDashboardData
      }
      questionnairesGad7Response={
        questionnairesGad7Response.data.questionnairesGad7Data
      }
      questionnairesSnapIvResponse={
        questionnairesSnapIvResponse.data.questionnairesSnapIvData
      }
      questionnairesPcl5Response={
        questionnairesPcl5Response.data.questionnairesPcl5Data
      }
      questionnairesPhq9Response={
        questionnairesPhq9Response.data.questionnairesPhq9Data
      }
      questionnairesDast10Response={
        questionnairesDast10Response.data.questionnairesDast10Data
      }
      questionnairesYBocsResponse={
        questionnairesYBocsResponse.data.questionnairesYBocsData
      }
      questionnairesAuditResponse={
        questionnairesAuditResponse.data.questionnairesAuditData
      }
      questionnairesAimsResponse={
        questionnairesAimsResponse.data.questionnairesAimsData
      }
      questionnairesHamDResponse={
        questionnairesHamDResponse.data.questionnairesHamDData
      }
      questionnairesMocaResponse={
        questionnairesMocaResponse.data.questionnairesMocaData
      }
    />
  )
}

export default QuestionnairesInfoPage
