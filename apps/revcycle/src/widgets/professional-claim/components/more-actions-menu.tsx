import { CaretDownIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

const MoreActionsMenu = () => {
  const moreActions = [
    {
      label: 'Save and Review Claim',
      onClick: () => {
        return
      },
    },
  ]

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button>
          <DotsVerticalIcon />
          Review
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {moreActions.map(({ label, onClick }) => (
          <DropdownMenu.Item onClick={onClick} key={label}>
            {label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { MoreActionsMenu }
