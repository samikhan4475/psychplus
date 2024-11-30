import { Flex, Text } from '@radix-ui/themes';
import { LabelAndValue } from '../shared';
import { HospitalDischargeWidgetSchemaType } from '@/ui/hospital/hospital-discharge-widget/hospital-discharge-widget-schema';
import { cn } from '@/utils';
import { formatKeyValue } from './utils';

interface HospitalDischargeListViewProps {
  label?: string;
  keys: { label: string; key: string; detail?: string }[];
  data: HospitalDischargeWidgetSchemaType;
}

const HospitalDischargeListView = ({
  label,
  keys,
  data,
}: HospitalDischargeListViewProps) => (
  <Flex direction="column">
    {label && (
      <Text className="whitespace-nowrap text-1 font-medium">{label}</Text>
    )}
    {keys.map((option) => {
     const value = formatKeyValue(
      data[option.key as keyof HospitalDischargeWidgetSchemaType] as string,
      data[option.detail as keyof HospitalDischargeWidgetSchemaType] as string
    );
      return option.key === 'hospitalCourse' ? (
        <Flex key={option.key} width="100%" direction="column">
          {option.label && (
            <Text className="whitespace-nowrap text-1 font-medium">{option.label}</Text>
          )}
          <Text className={cn('text-1')} weight="regular">
            {`${value}`}
          </Text>
        </Flex>
      ) : (
        <LabelAndValue
          key={option.key}
          label={option.label}
          value={value}
          />
      );
    })}
  </Flex>
);

export default HospitalDischargeListView;
