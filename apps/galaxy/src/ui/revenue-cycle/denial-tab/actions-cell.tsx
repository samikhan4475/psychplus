import { Button } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { ResponseHistoryRecord } from '../types'

const ActionsCell = ({ row }: PropsWithRow<ResponseHistoryRecord>) => {
  const onResolve = () => {
    // API Implementation will be done here
  }

  return (
    <Button
      highContrast
      size="1"
      type="button"
      onClick={onResolve}
    >
      Resolve
    </Button>
  )
}

export { ActionsCell }
