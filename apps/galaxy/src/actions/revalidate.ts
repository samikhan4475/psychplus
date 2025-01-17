'use server'

import { revalidateTag } from 'next/cache'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const revalidateAction = async () => {
  revalidateTag(QuickNoteSectionName.QuicknoteSectionHPI)
}

export { revalidateAction }
