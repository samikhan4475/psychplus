'use client'

import toast from "react-hot-toast";

const downloadFile = async (
  endpoint: string,
  filename: string,
  method: 'GET' | 'POST' = 'GET',
  bodyData?: any
) => {
  const options: RequestInit = {
    method,
  };

  if (method === 'POST' && bodyData) {
    options.body = JSON.stringify(bodyData);
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  const result = await fetch('/ehr' + endpoint, options);

  if (!result.ok) {
    toast.error(result.statusText ?? 'Failed to download file')
    return;
  }

  const blob = await result.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export { downloadFile };
