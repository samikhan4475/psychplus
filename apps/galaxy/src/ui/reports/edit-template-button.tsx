'use client';

import { Button, Text } from '@radix-ui/themes';

const EditTemplateButton = () => {

  return (
    <Button
      variant="outline"
      color="gray"
      className="text-black 'w-fit h-[24px] py-1 mr-2 px-2 flex items-center justify-center"
    >
      <Text className="text-[12px] font-regular text-pp-black-1">Edit</Text>
    </Button>
  );
};

export { EditTemplateButton };

