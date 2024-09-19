import { Dialog } from '@psychplus/ui/dialog';
import { IconButton } from '@psychplus/ui/icon-button';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Flex, Text } from '@radix-ui/themes';
import { EDIItem } from '../types';
import { EDIAddDialogForm } from './edi-add-dialog-form';

interface EDIAddDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (flg: boolean) => void,
  refresh: () => void,
  selectedEDIItem: EDIItem | null
}

const EDIAddDialog = (props: EDIAddDialogProps) => {
  const { isDialogOpen, setIsDialogOpen, selectedEDIItem, refresh } = props;
  
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Content className="max-w-[700px] z-100">
        <Dialog.Title>
          <Flex align="center" justify="between">
            <Text>
              New Insurance Plan EDI Setup
            </Text>
            <IconButton
              className='bg-transparent'
              onClick={() => setIsDialogOpen(false)}
            >
              <Cross1Icon width="18" height="18" color='black' />
            </IconButton>
          </Flex>
        </Dialog.Title>
        <EDIAddDialogForm
          refresh={() => {
            setIsDialogOpen(false)
            refresh()
          }}
          selectedEDIItem={selectedEDIItem}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EDIAddDialog };

