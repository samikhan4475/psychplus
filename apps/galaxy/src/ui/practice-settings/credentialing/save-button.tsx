'use client';

import { Button, Flex } from '@radix-ui/themes';
import { SaveIcon } from 'lucide-react';

const SaveButton = () => {
  return (
    <Flex className="ml-auto w-[70px]">
      <Button size="1" highContrast>
        <SaveIcon width={15} height={15} strokeWidth={1.75} />
        Save
      </Button>
    </Flex>
  );
};

export { SaveButton };
