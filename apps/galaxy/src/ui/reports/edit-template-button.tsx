'use client';

import { Button, Text } from '@radix-ui/themes';
import { useStore } from './store';
import { useState } from 'react';
import { AddTemplateDialog } from './add-template-dialog';

const EditTemplateButton = () => {
  const { selectedTemplate } = useStore();  
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outline"
        color="gray"
        onClick={onOpen}
        className="text-black w-fit h-[24px] py-1 mr-2 px-2 flex items-center justify-center"
      >
        <Text className="text-[12px] font-regular text-pp-black-1">Edit</Text>
      </Button>
      <AddTemplateDialog open={open} onClose={onClose} template={selectedTemplate} />
    </>
  );
};

export { EditTemplateButton };
