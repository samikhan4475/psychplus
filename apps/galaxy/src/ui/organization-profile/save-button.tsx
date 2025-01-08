'use client';

import { Button } from '@radix-ui/themes';
import { SaveIcon } from 'lucide-react';

const SaveButton = () => {
  return (
    <Button type="submit" size="1" highContrast>
      <SaveIcon width={15} height={15} strokeWidth={1.75}/>
      Save
    </Button>
  );
};

export { SaveButton };
