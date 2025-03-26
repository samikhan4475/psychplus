'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { AddTemplateDialog } from './add-template-dialog'
import { useState } from 'react';

const AddTemplateButton = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button
        variant="outline"
        color="gray"
        size="1"
        onClick={onOpen}
        className={`text-black flex items-center justify-center`}
      >
        <PlusIcon width="14px" height="14px" />
      </Button>
      <AddTemplateDialog open={open} onClose={onClose} />
    </>
  );
};

export { AddTemplateButton };
