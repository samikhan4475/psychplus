import { CaretDownIcon, FileTextIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

const PrintActionsMenu = () => {
  const printActions = [
    {
      label: 'Save and Print Claim',
      onClick: () => {
        return
      },
    },
    {
      label: 'Save and Show Preview',
      onClick: () => {
        return
      },
    },
    {
      label: 'Save and Print Copy',
      onClick: () => {
        return
      },
    },
    {
      label: 'Save and Print with Form',
      onClick: () => {
        return
      },
    },
  ]

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button>
          <FileTextIcon />
          Print
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {printActions.map(({ label, onClick }) => (
          <DropdownMenu.Item onClick={onClick} key={label}>
            {label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { PrintActionsMenu }
