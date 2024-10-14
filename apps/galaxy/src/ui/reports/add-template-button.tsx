'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Text } from '@radix-ui/themes';
import { AddTemplateDialog } from './add-template-dialog'
import { useState } from 'react';

type AddTemplateButtonProps = {
  isCollapsed: boolean;
};

const AddTemplateButton = ({ isCollapsed }: AddTemplateButtonProps) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button
        variant="outline"
        color="gray"
        onClick={onOpen}
        className={`text-black ${isCollapsed ? 'w-[20px] h-[20px] rounded-full p-0' : 'w-fit h-[24px] py-1 px-2'} flex items-center justify-center`}
      >
        <PlusIcon width="12px" height="12px" />
        {!isCollapsed && <Text className="text-[12px] font-regular">Add New</Text>}
      </Button>
      <AddTemplateDialog open={open} onClose={onClose} />
    </>
  );
};

export { AddTemplateButton };
