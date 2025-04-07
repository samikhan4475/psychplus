'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const revalidateAction = async (isTag = true) => {
  if (isTag) {
    revalidateTag(QuickNoteSectionName.QuicknoteSectionHPI)
  } else {
    revalidatePath('/ehr/p-chart/[id]/[apptId]/quicknotes', 'page')
  }
}

export { revalidateAction }
