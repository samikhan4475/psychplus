import { PropsWithChildren } from 'react'
import { Flex } from '@radix-ui/themes'

const LeftPanelActions = ({ children }: PropsWithChildren) => {
  return (
    <Flex wrap="wrap" className="gap-2">
      {children}
    </Flex>
  )
}

export { LeftPanelActions }
