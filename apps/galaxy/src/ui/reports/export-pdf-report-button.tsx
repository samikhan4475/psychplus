import { Printer2Icon } from '@/components/icons';
import { Button, Text } from '@radix-ui/themes';

interface ExportPdfButtonProps {
  onClick: () => void;
  loading: boolean;
}

const ExportPdfButton = ({ onClick, loading }: ExportPdfButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      className="w-fit text-black h-[24px] py-2 px-3 flex items-center justify-center bg-white"
      onClick={onClick}
      disabled={loading}
    >
      <Text className="text-[12px] font-regular text-pp-black-1 flex gap-1 items-center justify-center">
        <Printer2Icon className="mr-1" />{loading ? "Printing" : "Print"}
      </Text>
    </Button>
  );
};

export { ExportPdfButton };

