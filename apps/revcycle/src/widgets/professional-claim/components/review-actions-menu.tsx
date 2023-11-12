import { CaretDownIcon, ClipboardIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

const ReviewActionsMenu = () => {
  const reviewActions = [
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
          <ClipboardIcon />
          Review
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {reviewActions.map(({ label, onClick }) => (
          <DropdownMenu.Item onClick={onClick} key={label}>
            {label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { ReviewActionsMenu }
