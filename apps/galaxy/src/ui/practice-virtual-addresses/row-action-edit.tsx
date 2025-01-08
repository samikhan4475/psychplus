'use client';

import { type PropsWithRow } from '@/components';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button, IconButton } from '@radix-ui/themes';
import { useStore } from './store';
import { VirtualAddressDetails } from './types';

const RowActionEdit = ({
  row: { index },
}: PropsWithRow<VirtualAddressDetails>) => {
  const setEditingRow = useStore((state) => state.setEditingRow);
  const editingRow = useStore((state) => state.editingRow);

  const handleEdit = () => {
    setEditingRow(editingRow === index ? null : index);
  };

  return (
    <>
      {editingRow === index ? (
        <Button
          onClick={handleEdit}
          size="1" highContrast>
          Update
        </Button>
      ) : (
        <IconButton
          size="1"
          color="gray"
          variant="ghost"
          onClick={handleEdit}
        >
          <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
        </IconButton>
      )}
    </>
  );
};

export { RowActionEdit };
