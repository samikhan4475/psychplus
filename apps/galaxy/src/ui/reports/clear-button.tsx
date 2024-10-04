'use client';

import { Button, Text } from '@radix-ui/themes';

type ClearButtonProps = {
  onClear: () => void;
};

const ClearButton = ({ onClear }: ClearButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      className="text-black 'w-fit h-[24px] py-1 px-2 flex items-center justify-center"
      onClick={onClear}
    >
      <Text className="text-[12px] font-regular text-pp-black-1">Clear</Text>
    </Button>
  );
};

export { ClearButton };
