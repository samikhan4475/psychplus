import React from 'react'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'medicationDose'

const CommentBlock = () => {
  return (
    <Input
      placeholder="Add comment"
      label="Comment"
      field={FIELD_ID}
      className={'w-full'}
    />
  )
}

export default CommentBlock
