import { z } from "zod";
import { DateValue } from "react-aria-components";

const dateValidation = z.custom<DateValue | null>();

const tcmWidgetSchema = z
  .object({
    dcDate: dateValidation,
    dcHospitalName: z.string().trim(),
    dcHospitalServiceType: z.string(),
    dcContactMadeBy: z.string().trim().min(1, "Please Enter Contact Name"),
    tcmDate: dateValidation,
    tcmResults: z.string().min(1, { message: 'Please Select an Option' }),
  })
  .refine(
    (data) => data.dcDate !== null,
    {
      message: "Discharge Date is required",
      path: ["dcDate"],
    }
  )
  .refine(
    (data) => data.tcmDate !== null,
    {
      message: "Date is required",
      path: ["tcmDate"],
    }
  )
  .refine(
    (data) => {
      if (data.dcDate && data.tcmDate) {
        const dcDate = new Date(
          data.dcDate.year,
          data.dcDate.month - 1,
          data.dcDate.day
        );
        const tcmDate = new Date(
          data.tcmDate.year,
          data.tcmDate.month - 1,
          data.tcmDate.day
        );
        return tcmDate >= dcDate;
      }
      return true; 
    },
    {
      message: "Date cannot be smaller than Discharge Date",
      path: ["tcmDate"],
    }
  );

type TcmWidgetSchemaType = z.infer<typeof tcmWidgetSchema>;

export { tcmWidgetSchema, type TcmWidgetSchemaType };
