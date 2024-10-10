const sanitizePhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, '')
}

function getMaskedPhoneNumber(input: string): string {
  const cleaned = input.replace(/\D/g, '');
  const areaCode = cleaned.slice(0, 3);
  const centralOfficeCode = cleaned.slice(3, 6);
  const lineNumber = cleaned.slice(6, 10);

  let result = '';

  if (areaCode) {
    result += `(${areaCode})`;
  }

  if (centralOfficeCode) {
    result += `-${centralOfficeCode}`;
  }

  if (lineNumber) {
    result += `-${lineNumber}`;
  }

  return result.trim();
}

export { sanitizePhoneNumber, getMaskedPhoneNumber }
