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

export { truncateFileName, getFieldType };
