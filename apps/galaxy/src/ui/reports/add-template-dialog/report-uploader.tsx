'use client';

import { FormFieldContainer, FormFieldError } from '@/components';
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { truncateFileName } from '../utils';

const ReportUploader = () => {
  const form = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedReportName, setSelectedReportName] = useState<string | null>(null);

  const handleReportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('definitionPayloadUrl', file);
      setSelectedReportName(file.name);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveReport = () => {
    form.setValue('definitionPayloadUrl', null);
    setSelectedReportName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Flex
      className="w-[37%] rounded-[4px] bg-pp-bg-accent px-2 py-1.5"
      align="center"
      justify="between"
    >
      <FormFieldContainer className="w-full">
        <Flex align="center" justify="between">
          <Text className="text-pp-black-3" size="1" weight="medium">
            Upload File<Text className="text-pp-red ml-1">*</Text>
          </Text>
          <Button
            onClick={selectedReportName ? handleRemoveReport : handleButtonClick}
            variant="outline"
            type='button'
            color="gray"
            className="w-fit text-black h-[24px] py-2 px-3 flex items-center justify-center bg-white cursor-pointer"
          >
            <Text className="text-[12px] font-regular text-pp-black-1 flex gap-1 items-center justify-center">
              {selectedReportName ? (
                <>
                  <Cross2Icon color="red" /> {truncateFileName(selectedReportName)}
                </>
              ) : (
                <>
                  <UploadIcon /> Upload
                </>
              )}
            </Text>
          </Button>
          <input
            type="file"
            accept=".rdl"
            ref={fileInputRef}
            className="hidden"
            onChange={handleReportChange}
          />
        </Flex>
      </FormFieldContainer>
      <FormFieldError name="definitionPayloadUrl" />
    </Flex>
  );
};

export { ReportUploader };

