import React, { useState } from 'react'
import MultiAccordian from '../../shared-blocks/multi-accordian'
import Family from './history-tab-ui/family/Family'
import Medical from './history-tab-ui/medical/Medical'
import PastPsychiatry from './history-tab-ui/past-psychiatry/past-psychiatry'
import Social from './history-tab-ui/social/Social'
import SubstanceUse from './history-tab-ui/substance-use/substance-use'

const accordions = [
  {
    title: 'Past Psychiatry Hx',
    content: <PastPsychiatry />,
  },
  {
    title: 'Family Hx',
    content: <Family />,
  },
  {
    title: 'Social Hx',
    content: <Social />,
  },
  {
    title: 'Substance Use Hx',
    content: <SubstanceUse />,
  },
  {
    title: 'Medical Hx',
    content: <Medical />,
  },
]

const Histories = () => {
  const [openItems, setOpenItems] = useState<string[]>([])

  return (
    <MultiAccordian
      accordions={accordions}
      openItems={openItems}
      setOpenItems={setOpenItems}
    />
  )
}

export { Histories }
