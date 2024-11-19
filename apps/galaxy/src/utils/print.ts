const handlePrint = (id: string) => {
  const printContent = document.getElementById(id)
  if (printContent) {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(
        `<html><head><title>Print</title></head><body>${printContent.innerHTML}</body></html>`,
      )
      printWindow.document.close()
      printWindow.print()
    }
  }
}

export { handlePrint }
