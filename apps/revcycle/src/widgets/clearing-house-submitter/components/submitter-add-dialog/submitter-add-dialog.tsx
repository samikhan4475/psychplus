import { Dialog } from '@psychplus/ui/dialog';
import { IconButton } from '@psychplus/ui/icon-button';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Flex, Text } from '@radix-ui/themes';
import { SubmitterItem } from '../types';
import { SubmitterAddDialogForm } from './submitter-add-dialog-form';

interface SubmitterAddDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (flg: boolean) => void,
  refresh: () => void,
  selectedSubmitterItem: SubmitterItem | null
}

const SubmitterAddDialog = (props: SubmitterAddDialogProps) => {
  const { isDialogOpen, setIsDialogOpen, selectedSubmitterItem, refresh } = props;

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Content className="max-w-[600px] z-100">
        <Dialog.Title>
          <Flex align="center" justify="between">
            <Text>
              Add Submitter
            </Text>
            <IconButton
              className='bg-transparent'
              onClick={() => setIsDialogOpen(false)}
            >
              <Cross1Icon width="18" height="18" color='black' />
            </IconButton>
          </Flex>
        </Dialog.Title>
        <SubmitterAddDialogForm
          refresh={() => {
            setIsDialogOpen(false)
            refresh()
          }}
          selectedSubmitterItem={selectedSubmitterItem}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { SubmitterAddDialog };

