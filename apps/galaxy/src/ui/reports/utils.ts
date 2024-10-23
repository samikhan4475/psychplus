import { ParameterCodeSet } from "./types";

export const parseGeneratedReport = (report: string) => {
  const lines = report.trim().split('\n');
  const parseLine = (line: string) => {
    const result = [];
    let isInQuotes = false;
    let currentField = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        isInQuotes = !isInQuotes;
      } else if (char === ',' && !isInQuotes) {
        result.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }

    result.push(currentField.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);

  const data = rows.map(row => {
    const rowData: { [key: string]: string } = {};
    headers.forEach((header, index) => {
      rowData[header.trim()] = row[index].trim();
    });
    return rowData;
  });

  return { headers, data };
};

export const formatHeader = (header: string) => {
  return header.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
};

const truncateFileName = (fileName: string, maxLength = 15) => {
  if (fileName.length <= maxLength) return fileName;
  return `${fileName.substring(0, maxLength)}...`;
};

const getFieldType = (parameters: ParameterCodeSet[], code: string): string => {
  const fieldType = parameters.find((parameter) => parameter.code === code)?.displayName;
  return fieldType ?? '';
};

const downloadCSVReport = (data: string, reportType: string) => {
  let blob;
  if (reportType === 'csv') {
    if (typeof data !== 'string') {
      data = convertToCSV(data);
    }

    blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report.csv`;  
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    console.error('Unsupported report type');
  }
};

const convertToCSV = (data: any[]): string => {
  if (!data.length) return '';

  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => 
    Object.values(obj).map(val => `"${val}"`).join(',') 
  );

  return [headers, ...rows].join('\n');
};
 
const downloadPDFFile = async (endpoint: string, filename: string, data?: string) => {
  try {
    const fetchOptions: RequestInit = {
      method: data ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    }
 
    const result = await fetch('/ehr' + endpoint, fetchOptions)
    
    if (!result.ok) {
      throw new Error(`Failed to fetch ${filename}: ${result.statusText}`)
    }
    const htmlContent = await result.text();
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    iframe.contentDocument?.open();
    iframe.contentDocument?.write(htmlContent);
    iframe.contentDocument?.close();
    
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    document.body.removeChild(iframe);
  } catch (error) {
    console.error('Error downloading file:', error)
    throw error
  }
}

export { truncateFileName, getFieldType, downloadCSVReport, downloadPDFFile };
