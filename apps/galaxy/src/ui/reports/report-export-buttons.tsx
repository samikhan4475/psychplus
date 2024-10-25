'use client';

import { Flex } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import { getRunReportAction } from './actions';
import { ExportCsvButton } from './export-csv-report-button';
import { ExportPdfButton } from './export-pdf-report-button';
import { useStore } from './store';
import { REPORT_TYPE } from './types';
import { downloadCSVReport, downloadPDFFile } from './utils';
import { GET_TEMPLATE_REPORT } from '@/api/endpoints';

const ReportExportButtons = () => {
  const { selectedTemplate, filtersData } = useStore();

  const handleExport = async (reportType: REPORT_TYPE) => {
    if (!selectedTemplate?.id) return;
    const payload = {
      templateId: selectedTemplate.id,
      reportType,
      data: filtersData ? filtersData : [],
    };

    if (reportType === REPORT_TYPE.PDF) {
      const endpoint = GET_TEMPLATE_REPORT(selectedTemplate.id, reportType)
      const fileName = "report.pdf"
      await downloadPDFFile(endpoint, fileName, filtersData)
    } else if (reportType === REPORT_TYPE.CSV) {
      const result = await getRunReportAction(payload);

      if (result.state === 'success') {
        downloadCSVReport(result.data, reportType === REPORT_TYPE.CSV ? 'csv' : 'pdf');
      } else {
        toast.error(result.error ?? 'Failed to export report');
      }
    }
  };

  return (
    <Flex justify="end" gap="2" mt="2" px="2">
      <ExportPdfButton onClick={() => handleExport(REPORT_TYPE.PDF)} />
      <ExportCsvButton onClick={() => handleExport(REPORT_TYPE.CSV)} />
    </Flex>
  );
};

export { ReportExportButtons };

