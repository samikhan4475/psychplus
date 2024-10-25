'use client';

import { Dialog } from '@radix-ui/themes';
import { X } from 'lucide-react';
import { AddTemplateForm } from './add-template-form';
import { EditTemplateForm } from './edit-template-form';
import { Template } from '../types';

interface AddTemplateDialogProps {
  open?: boolean;
  onClose?: () => void;
  template?: Template | null;
}

const AddTemplateDialog = ({ open, onClose, template }: AddTemplateDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[800px] rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="font-medium">
          {template ? 'Edit Template' : 'Add New Template'}
        </Dialog.Title>
        {template ? (
          <EditTemplateForm defaultValues={template} onClose={onClose} />
        ) : (
          <AddTemplateForm onClose={onClose} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { AddTemplateDialog };
