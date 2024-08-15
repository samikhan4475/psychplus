'use client'

import { Flex } from '@radix-ui/themes'
import { SubmissionTable } from './submission-table'

const SubmissionTableTab = () => {
  return (
    <Flex direction="column" className="h-fit p-2">
      <SubmissionTable type='electronic'/>
    </Flex>
  )
}

export { SubmissionTableTab }
