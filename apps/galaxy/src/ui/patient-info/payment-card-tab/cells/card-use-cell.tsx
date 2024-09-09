'use client'

import { Flex, Switch } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CreditCard } from '../types'

const CardUseCell = ({ row }: PropsWithRow<CreditCard>) => {
  return (
    <Flex width={'100%'} justify={'center'}>
      <Switch defaultChecked color="green" size={'1'} />
    </Flex>
  )
}

export { CardUseCell }
