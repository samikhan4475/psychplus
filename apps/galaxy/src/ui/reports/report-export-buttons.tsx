'use client';

import { Flex } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import { ExportCsvButton } from './export-csv-report-button';
import { ExportPdfButton } from './export-pdf-report-button';
import { useStore } from './store';
import { REPORT_TYPE } from './types';
import { GET_TEMPLATE_REPORT } from '@/api/endpoints';
import { downloadFile } from '@/utils/download';
import { useState } from 'react';

const ReportExportButtons = () => {
  const { selectedTemplate, filtersData } = useStore();
  const [loading, setLoading] = useState({ PDF: false, CSV: false });

  const handleExport = async (reportType: REPORT_TYPE) => {
    if (!selectedTemplate?.id) return;

    setLoading(prev => ({ ...prev, [reportType]: true }));
    try {
      const endpoint = GET_TEMPLATE_REPORT(selectedTemplate.id, reportType);
      const fileName = reportType === REPORT_TYPE.PDF ? 'report.pdf' : 'report.csv';
      await downloadFile(endpoint, fileName, 'POST', filtersData);
    } catch (error) {
      toast.error(`Failed to download ${reportType}`);
    } finally {
      setLoading(prev => ({ ...prev, [reportType]: false }));
    }
  };

  return (
    <Flex className='bg-pp-bg-table-cell' justify="end" gap="2" mt="2" px="2">
      <ExportPdfButton onClick={() => handleExport(REPORT_TYPE.PDF)} loading={loading.PDF} />
      <ExportCsvButton onClick={() => handleExport(REPORT_TYPE.CSV)} loading={loading.CSV} />
    </Flex>
  );
};

export { ReportExportButtons };

