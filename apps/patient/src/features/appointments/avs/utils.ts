import { Appointment } from '@psychplus-v2/types'
import { format } from 'date-fns'
import { formatDateTime } from '@psychplus/utils/time'

const formatUTCDate = (dateString: string, dateFormat = 'MM/dd/yyyy HH:mm') => {
  const utcDate = new Date(dateString)
  const adjustedDate = new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
  )
  return format(adjustedDate, dateFormat)
}

const handlePrint = (id: string, title?: string) => {
  const printContent = document.getElementById(id)
  if (printContent) {
    const clonedContent = printContent.cloneNode(true) as HTMLElement
    clonedContent
      .querySelectorAll('[class*="loader"], [class*="loading"], [data-loader]')
      .forEach((loaderElement) => {
        loaderElement.remove()
      })

    const printWindow = window.open('', '_blank')

    if (printWindow) {
      printWindow.document.title = title ?? ''
      printWindow.document.write(
        `<html>
          <head>
            <title>${title}</title>
            <style>
              body {
                font-family: 'Arial', 'Helvetica Neue', 'Segoe UI', sans-serif;
                margin: 20px;
              }
              @media print {
                body {
                  font-family: 'Arial', 'Helvetica Neue', 'Segoe UI', sans-serif;
                  font-size: 10pt;
                }
                h1 {
                  font-size: 12pt;
                  font-weight: bold;
                }
                h2 {
                  font-size: 10pt;
                  font-weight: bold;
                }
                p, div, span {
                  font-size: 8pt;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 8pt;
                  page-break-inside: avoid;
                }
                th, td {
                  padding: 4px;
                  border: 1px solid #ddd;
                  text-align: left;
                }
                thead {
                  display: table-row-group;
                }
              }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            ${clonedContent.innerHTML}
          </body>
        </html>`,
      )
      printWindow.document.close()
      printWindow.print()
    }
  }
}

const getVisitDropdownOptions = (appointment: Appointment) => ({
  label: `${formatDateTime(new Date(appointment?.startDate))}, ${
    appointment?.type
  }, ${appointment?.visitType ?? ''}`,
  value: `${appointment?.id}`,
})

export { formatUTCDate, handlePrint, getVisitDropdownOptions }
