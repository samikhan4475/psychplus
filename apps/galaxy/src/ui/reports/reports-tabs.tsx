'use client';

import { LoadingPlaceholder } from '@/components';
import { Code } from '@/types';
import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { useEffect } from 'react';
import { TabItem } from './reports-tabs-item';
import { ReportsTemplateTabs } from './reports-template-tabs';
import { useStore } from './store';

const ReportsTabs = () => {
  const { reports, loading, fetchReportsAndTemplates, selectedReport, setSelectedReport } = useStore();

  useEffect(() => {
    fetchReportsAndTemplates();
  }, [fetchReportsAndTemplates]);

  const handleTabClick = (reportItem: Code) => {
    setSelectedReport(reportItem);
  };

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    );
  }

  return (
    <Flex className="w-full rounded-1 shadow-2 h-full bg-pp-bg-accent">
      <Box className="w-56 m-1 bg-white">
        <ScrollArea>
          <Flex direction="column" className="p-2 gap-1">
            {reports.map((item) => (
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
