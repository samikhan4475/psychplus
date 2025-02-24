import { Button } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { useStore } from '@/ui/assigning-authorities/store'
import { AssigningAuthority } from '@/ui/assigning-authorities/types'

const ActionsCell = ({ row }: PropsWithRow<AssigningAuthority>) => {
  const { setSelectedAssigningAuthority } = useStore((state) => ({
    setSelectedAssigningAuthority: state.setSelectedAssigningAuthority,
  }))

  return (
    <Button
      highContrast
      size="1"
      className="w-full"
      onClick={() => setSelectedAssigningAuthority(row.original)}
    >
      Select
    </Button>
  )
}

export { ActionsCell }
