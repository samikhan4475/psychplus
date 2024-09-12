const LabOrderpayload = (appointmentIds: number[], patientId: number[]) => {
  return {
    appointmentIds: appointmentIds,
    patientId: patientId,
  }
};
const printStyle = `
  @page {
    size: 58mm 25.4mm; 
    margin: 0;
    margin-left: 10px;
    margin-top: 10px;
    }
    .text-value{
    font-weight:500;
    }
    .text-label{
    font-weight:300;
    }
    span {
    font-size:10px !important;
    padding-left:2px;
    }
    body {
     margin: 0;
     padding: 0;
   }
     .specimen-label{
     display:none;
     }
    @media all {
        .pageBreak {
            display:none;
            }
        }
    @media print {
        .pageBreak {
            page-break-before:always;
            }
        }
                    `;
const printResultStyle = `
  @page {
   size: 250mm 297mm;
    margin: 0;
    }
    th {
    font-weight:500;
    }
    td,span {
    font-size:10px !important;
    }
    body {
     margin: 0;
     padding: 0;
   }
     .hidden-object {
     display:none;
     }
    @media all {
        .pageBreak {
            display:none;
            }
        }
    @media print {
        .pageBreak {
            page-break-before:always;
            }
        }
                    `;
export {
  LabOrderpayload,
  printStyle, printResultStyle
}
