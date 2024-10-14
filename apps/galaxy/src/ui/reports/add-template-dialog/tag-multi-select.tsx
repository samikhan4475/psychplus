'use client';

import { useCallback, useMemo, useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import {
  Box,
  Checkbox,
  Flex,
  ScrollArea,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils';

// TODO: will be removed after integration
const sampleCodes = [
  {
    value: 'code1',
    display: 'Nurses',
    groupingCode: 'group1',
  },
  {
    value: 'code2',
    display: 'Doctors',
    groupingCode: 'group1',
  },
  {
    value: 'code3',
    display: 'Providers',
    groupingCode: 'group2',
  },
  {
    value: 'code4',
    display: 'Code 4',
    groupingCode: 'group2',
  },
  {
    value: 'code5',
    display: 'Code 5',
    groupingCode: 'group3',
  },
  {
    value: 'code6',
    display: 'Code 6',
    groupingCode: 'group3',
  },
  {
    value: 'code7',
    display: 'DataType',
    groupingCode: 'dataGroup',
  },
];

const useCodesetCodes = (codeset: string) => {
  return sampleCodes;
};

interface CodesetFormSelectProps extends React.ComponentProps<typeof Select.Root> {
  name: string;
  codeset: string;
  exclude?: string[];
  placeholder?: string;
  groupingCodes?: string[];
}

const TagsMultiSelect = ({
  name,
  codeset,
  exclude,
  groupingCodes,
  ...selectProps
}: CodesetFormSelectProps) => {
  const form = useFormContext();
  const codes = useCodesetCodes(codeset);

  const selected: string[] = form.watch(name) || [];

  const [searchValue, setSearchValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const groupedCodes = useMemo(
    () =>
      groupingCodes
        ? codes.filter((item) =>
            groupingCodes.some((code) => item.groupingCode?.startsWith(code)),
          )
        : codes,
    [codes, groupingCodes],
  );

  const filteredCodes = useMemo(() => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    const searchedCodes = normalizedSearchValue
      ? groupedCodes.filter((code) =>
          code.display.toLowerCase().includes(normalizedSearchValue),
        )
      : groupedCodes;

    return searchedCodes.filter((code) => !exclude?.includes(code.value));
  }, [groupedCodes, searchValue, exclude]);

  const addValue = useCallback(
    (value: string) => {
      const newValue = [...selected, value];
      form.setValue(name, newValue);
    },
    [selected, form, name],
  );

  const removeValue = useCallback(
    (value: string) => {
      const newValue = selected.filter((item) => item !== value);
      form.setValue(name, newValue);
    },
    [selected, form, name],
  );

  const ref = useOnclickOutside(() => {
    setShowOptions(false);

    if (!searchValue) {
      return;
    }
  });

  const controls = (
    <Flex
      className={cn(
        'flex-wrap overflow-y-auto rounded-2 border border-gray-7 align-baseline',
        selectProps.disabled && 'bg-gray-3 text-gray-11',
      )}
      align="center"
      gap="1"
      pl="1"
    >
      {selected?.map((item: string) => (
        <Flex
          key={item}
          className="bg-pp-table-border whitespace-nowrap rounded-6"
          align="center"
          px="1"
        >
          <Text size="1" weight="medium">
            {codes.find((code) => code.value === item)?.display}
          </Text>
          <Cross2Icon
            onClick={() => !selectProps.disabled && removeValue(item)}
            className={cn('cursor-pointer', {
              'cursor-not-allowed': selectProps.disabled,
            })}
          />
        </Flex>
      ))}
      <TextField.Root
        style={
          {
            '--text-field-border-width': '0px',
          } as React.CSSProperties
        }
        size="1"
        className="min-w-14 !outline-white flex-1 [box-shadow:none]"
        placeholder="Search by keyword"
        disabled={selectProps.disabled}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setShowOptions(true)}
      />
    </Flex>
  );

  let options = (
    <Flex
      justify="center"
      className="bg-white !absolute bottom-full mx-auto w-full items-center rounded-4 p-1 shadow-3"
    >
      <Text size="2" color="gray" align="center">
        No results
      </Text>
    </Flex>
  );

  if (filteredCodes.length > 0) {
    options = (
      <ScrollArea className="bg-white !absolute bottom-full z-50 mx-auto h-auto max-h-32 w-full rounded-4 p-2 shadow-3">
        {filteredCodes?.map((code) => {
          return (
            <Text
              key={code.value}
              as="label"
              size="2"
              className="cursor-pointer"
            >
              <Flex
                gap="2"
                className={cn(selected.includes(code.value) && 'bg-red-1')}
              >
                <Checkbox
                  highContrast
                  checked={selected.includes(code.value)}
                  onCheckedChange={(checked) => {
                    checked ? addValue(code.value) : removeValue(code.value);
                  }}
                />
                {code.display}
              </Flex>
            </Text>
          );
        })}
      </ScrollArea>
    );
  }

  return (
    <Box ref={ref} className="relative">
      {controls}
      {showOptions ? options : null}
    </Box>
  );
};

export { TagsMultiSelect };
