'use client'

import { ButtonBar, ProfessionalClaimTabs } from './components'
import { ProfessionalClaimWidgetProps } from './professional-claim-widget.server'

const ProfessionalClaimWidgetClient = ({
  token,
}: ProfessionalClaimWidgetProps) => {
  return (
    <>
      <ButtonBar />
      <ProfessionalClaimTabs />
    </>
  )
}

export { ProfessionalClaimWidgetClient }
