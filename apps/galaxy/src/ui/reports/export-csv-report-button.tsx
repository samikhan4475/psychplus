import { Button, Text } from '@radix-ui/themes';
import { UploadIcon } from '@radix-ui/react-icons';

interface ExportCsvButtonProps {
  onClick: () => void;
}

const ExportCsvButton = ({ onClick }: ExportCsvButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      className="w-fit text-black h-[24px] py-2 px-3 flex items-center justify-center bg-white"
      onClick={onClick}
    >
      <Text className="text-[12px] font-regular text-pp-black-1 flex gap-1 items-center justify-center">
        <UploadIcon /> Export
      </Text>
    </Button>
  );
};

export { ExportCsvButton };
