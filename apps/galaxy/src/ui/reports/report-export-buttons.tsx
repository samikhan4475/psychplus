'use client';

import { Flex } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import { getRunReportAction } from './actions';
import { ExportCsvButton } from './export-csv-report-button';
import { ExportPdfButton } from './export-pdf-report-button';
import { useStore } from './store';
import { REPORT_TYPE } from './types';
import { downloadCSVReport } from './utils';
import { GET_TEMPLATE_REPORT } from '@/api/endpoints';
import { downloadFile } from '@/utils/download';
import { useState } from 'react';

const ReportExportButtons = () => {
  const { selectedTemplate, filtersData } = useStore();
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);

  const handleExport = async (reportType: REPORT_TYPE) => {
    if (!selectedTemplate?.id) return;
    const payload = {
      templateId: selectedTemplate.id,
      reportType,
      data: filtersData ? filtersData : [],
    };

    if (reportType === REPORT_TYPE.PDF) {
      setLoadingPDF(true);
      try {
        const endpoint = GET_TEMPLATE_REPORT(selectedTemplate.id, reportType);
        const fileName = "report.pdf";
        await downloadFile(endpoint, fileName, 'POST', filtersData);
      } catch (error) {
        toast.error('Failed to download PDF');
      } finally {
        setLoadingPDF(false);
      }
    } else if (reportType === REPORT_TYPE.CSV) {
      setLoadingCSV(true);
      const result = await getRunReportAction(payload);
      if (result.state === 'success') {
        downloadCSVReport(result.data, 'csv');
      } else {
        toast.error(result.error ?? 'Failed to export CSV');
      }
      setLoadingCSV(false);
    }
  };

  return (
    <Flex className='bg-pp-bg-table-cell' justify="end" gap="2" mt="2" px="2">
      <ExportPdfButton onClick={() => handleExport(REPORT_TYPE.PDF)} loading={loadingPDF}/>
      <ExportCsvButton onClick={() => handleExport(REPORT_TYPE.CSV)} loading={loadingCSV} />
    </Flex>
  );
};

export { ReportExportButtons };

