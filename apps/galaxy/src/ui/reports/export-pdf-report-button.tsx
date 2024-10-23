import { Button, Text } from '@radix-ui/themes';
import { PrinterIcon } from '@/components/icons';

interface ExportPdfButtonProps {
  onClick: () => void;
}

const ExportPdfButton = ({ onClick }: ExportPdfButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      className="w-fit text-black h-[24px] py-2 px-3 flex items-center justify-center bg-white"
      onClick={onClick}
    >
      <Text className="text-[12px] font-regular text-pp-black-1 flex gap-1 items-center justify-center">
        <PrinterIcon className="mr-1" /> Print
      </Text>
    </Button>
  );
};

export { ExportPdfButton };
