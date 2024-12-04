const handlePrint = (id: string, title?: string) => {
  const printContent = document.getElementById(id)
  if (printContent) {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(
        `<html><head><title>Print</title></head><body><h1>${title}</h1>${printContent.innerHTML}</body></html>`,
      )
      printWindow.document.close()
      printWindow.print()
    }
  }
}

export { handlePrint }
