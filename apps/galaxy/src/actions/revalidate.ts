'use server'

import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { revalidatePath, revalidateTag } from 'next/cache'

const revalidateHpiTag = async () => {
  revalidateTag(QuickNoteSectionName.QuicknoteSectionHPI)
}

const revalidateQuickNotePage = async () => {
  revalidatePath('/ehr/p-chart/[id]/[apptId]/quicknotes', 'page')
}

const revalidateHpiPage = async () => {
  revalidatePath('/ehr/p-chart/[id]/[apptId]/hpi', 'page')
}

const revalidateAction = async (isTag = true, isHpiPage = false) => {
  if (isTag) {
    return revalidateHpiTag()
  }

  return isHpiPage ? revalidateHpiPage() : revalidateQuickNotePage()
}

export { revalidateAction }
