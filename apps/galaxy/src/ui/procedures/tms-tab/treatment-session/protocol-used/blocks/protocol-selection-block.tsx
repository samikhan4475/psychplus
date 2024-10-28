'use client'

import { Button, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { ProtocolTitles } from '../../types'

interface ProtocolSelectionType {
  protocolTitle: ProtocolTitles
}

const ProtocolSelection = ({ protocolTitle }: ProtocolSelectionType) => {
  const form = useFormContext()
  const selectedProtocol = form.watch('protocol')

  const isTitleSelected = selectedProtocol === protocolTitle

  return (
    <Button
      className={cn(
        isTitleSelected &&
          'border-pp-focus-outline bg-pp-focus-bg border border-solid',
        !isTitleSelected && 'border-pp-grey bg-white border border-solid',
      )}
      size="1"
      onClick={() => form.setValue('protocol', protocolTitle)}
      type="button"
    >
      <Text
        className="text-pp-black-3"
        weight={isTitleSelected ? 'medium' : 'regular'}
      >
        {protocolTitle}
      </Text>
    </Button>
  )
}

export { ProtocolSelection }
