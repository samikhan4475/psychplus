import React from 'react'
import { Button } from '@radix-ui/themes'

const SaveButton = ({ loading }: { loading: boolean }) => {
  return (
    <Button
      size="2"
      loading={loading}
      disabled={loading}
      highContrast
      name="Save"
      type="submit"
    >
      Save
    </Button>
  )
}

export { SaveButton }
