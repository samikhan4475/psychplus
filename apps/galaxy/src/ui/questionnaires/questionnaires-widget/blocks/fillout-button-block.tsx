'use client'

import { Button, Tooltip } from '@radix-ui/themes'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FillOutButtonAims } from '../../aims-tab/fill-out-button'
import { FillOutButtonAudit } from '../../audit-tab/fill-out-button'
import { FillOutButtonDast10 } from '../../dast-10-tab/fill-out-button'
import { FillOutButtonGad7 } from '../../gad-7-tab/fill-out-button'
import { FillOutButtonHamD } from '../../ham-d-tab/fill-out-button'
import { FillOutButtonMoca } from '../../moca-tab/fill-out-button'
import { FillOutButtonPcl5 } from '../../pcl-5-tab/fill-out-button'
import { FillOutButtonPhq9 } from '../../phq-9-tab/fill-out-button'
import { FillOutButtonSnapIv } from '../../snap-iv-tab/fill-out-button'
import { FillOutButtonYBocs } from '../../y-bocs-tab/fill-out-button'

const fillOutButtons = {
  [QuickNoteSectionName.QuickNoteSectionPhq9]: FillOutButtonPhq9,
  [QuickNoteSectionName.QuickNoteSectionGad7]: FillOutButtonGad7,
  [QuickNoteSectionName.QuickNoteSectionSnapIV]: FillOutButtonSnapIv,
  [QuickNoteSectionName.QuickNoteSectionDast10]: FillOutButtonDast10,
  [QuickNoteSectionName.QuickNoteSectionAudit]: FillOutButtonAudit,
  [QuickNoteSectionName.QuickNoteSectionHamD]: FillOutButtonHamD,
  [QuickNoteSectionName.QuickNoteSectionYbcos]: FillOutButtonYBocs,
  [QuickNoteSectionName.QuickNoteSectionMoca]: FillOutButtonMoca,
  [QuickNoteSectionName.QuickNoteSectionAims]: FillOutButtonAims,
  [QuickNoteSectionName.QuickNoteSectionPcl5]: FillOutButtonPcl5,
}

const FilloutButtonBlock = ({ questionnaire }: { questionnaire: string }) => {
  const FillOutComponent =
    fillOutButtons[questionnaire as keyof typeof fillOutButtons]

  return (
    <Tooltip content="Fillout">
      <Button variant="ghost" onClick={(e) => e.preventDefault()}>
        {FillOutComponent && <FillOutComponent data={[]} />}
      </Button>
    </Tooltip>
  )
}

export { FilloutButtonBlock }
