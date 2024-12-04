import { Text } from '@radix-ui/themes';
import { BlockContainer, LabelAndValue } from '../shared'
import { TcmWidgetSchemaType } from '@/ui/assessment-plan/tcm-widget/tcm-widget-schema'
interface TcmProps {
  keys: { label: string; key: string;}[];
  data: TcmWidgetSchemaType;
}

const Details = ({
  keys,
  data,
}: TcmProps) => ( 
  <BlockContainer heading="TCM">
    {keys.map((option) => {
      const value = data[option.key as keyof TcmWidgetSchemaType] as string
      return (
        <LabelAndValue
          key={option.key}
          label={option.label}
          value={value}
        />
      );
    })}
    <Text className="whitespace-nowrap text-1 font-medium">Reviewed patients medical records and discharge medications</Text>
  </BlockContainer>
);
export { Details }
