import { ExportIcon } from '@/components/icons';
import { Button, Text } from '@radix-ui/themes';

interface ExportCsvButtonProps {
  onClick: () => void;
  loading: boolean;
}

const ExportCsvButton = ({ onClick, loading }: ExportCsvButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      className="w-fit text-black h-[24px] py-2 px-3 flex items-center justify-center bg-white"
      onClick={onClick}
      disabled={loading}
    >
      <Text className="text-[12px] font-regular text-pp-black-1 flex gap-1 items-center justify-center">
        <ExportIcon /> {loading ? "Exporting" : "Export"}
      </Text>
    </Button>
  );
};

export { ExportCsvButton };

