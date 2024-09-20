'use client'

import { Flex } from '@radix-ui/themes'
import { AddCommentForm } from './add-comment-form'
import { TreatmentTable } from './treatment-table'

const TreatmentTab = () => {
  return (
    <Flex direction="column" gap="2" width="100%" py="2">
      <AddCommentForm />
      <TreatmentTable />
    </Flex>
  )
}

export { TreatmentTab }
