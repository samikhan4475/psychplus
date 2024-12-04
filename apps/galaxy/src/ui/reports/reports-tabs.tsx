'use client';

import { LoadingPlaceholder } from '@/components';
import { Code } from '@/types';
import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { useEffect } from 'react';
import { TabItem } from './reports-tabs-item';
import { ReportsTemplateTabs } from './reports-template-tabs';
import { useStore } from './store';

const ReportsTabs = () => {
  const { reports, loading, fetchReportsAndTemplates, selectedReport, setSelectedReport, setGeneratedReport, setSelectedTemplate, fetchStaffData } = useStore();

  useEffect(() => {
    fetchReportsAndTemplates();
    fetchStaffData();
  }, [fetchReportsAndTemplates, fetchStaffData]);
  
  const filteredReports = reports.filter(report => 
    report.code === 'Provider' || report.codeAttributes?.every(attr => attr.content !== '99')
  );

  const handleTabClick = (reportItem: Code) => {
    setSelectedReport(reportItem);
    setSelectedTemplate(null);
    setGeneratedReport(null);
  };

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center" width="100%" className='h-[600px]'>
        <LoadingPlaceholder />
      </Flex>
    );
  }
  return (
    <Flex className="w-full rounded-1 shadow-2 overflow-hidden " mb="4">
      <Box className="w-56 mx-1 my-0 bg-white ">
        <ScrollArea >
          <Flex direction="column" className="p-2 gap-1">
            {filteredReports.map((item) => (
              <TabItem
                key={item.code}
                displayName={item.displayName}
                isActive={selectedReport?.code === item.code}
                onClick={() => handleTabClick(item)}
              />
            ))}
          </Flex>
        </ScrollArea>
      </Box>

      {selectedReport &&
        <ReportsTemplateTabs />
      }
    </Flex>
  );
};

export { ReportsTabs };
