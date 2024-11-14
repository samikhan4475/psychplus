import toast from 'react-hot-toast'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn as transformFamilyPsychHx } from '@/ui/family-psych-hx/family-psych-hx-widget/data'
import { HistoryView } from '@/ui/histories/history-view'
import { transformIn as transformPastMedicalHx } from '@/ui/past-medical-hx/past-medical-hx-widget/data'
import { transformIn as transformPastPsychHx } from '@/ui/past-psych-hx/past-psych-hx-widget/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn as transformSocialHx } from '@/ui/social-hx/social-hx-widget/data'
import { transformIn as transformSubstanceUseHx } from '@/ui/substance-use-hx/substance-use-hx-widget/data'

interface PatientInfoPageProps {
  params: {
    id: string
  }
}

const HistoryPage = async ({ params }: PatientInfoPageProps) => {
  const response = await getQuickNoteDetailAction(params.id, [
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
  ])

  if (response.state === 'error') {
    return toast.error('Failed to fetch data')
  }

  const pastPsychHxData = transformPastPsychHx(response.data)
  const familyPsychHxData = transformFamilyPsychHx(response.data)
  const medicalPsychHxData = transformPastMedicalHx(response.data)
  const socialHxData = transformSocialHx(response.data)
  const substanceUseHxData = transformSubstanceUseHx(response.data)

  return (
    <HistoryView
      pastPsychHxData={pastPsychHxData}
      familyPsychHxData={familyPsychHxData}
      medicalPsychHxData={medicalPsychHxData}
      socialHxData={socialHxData}
      substanceUseHxData={substanceUseHxData}
    />
  )
}

export default HistoryPage
