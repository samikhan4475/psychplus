import { z } from "zod";
import { DateValue } from "react-aria-components";
import { DISABLING_RESULTS } from "./constants";
import { getDateDifference } from "@/utils";

const dateValidation = z.custom<DateValue | null>();

const tcmWidgetSchema = z
  .object({
    dcDate: dateValidation,
    dcHospitalName: z.string().trim().min(1,{ message: 'Hospital name is required'}),
    dcHospitalServiceType: z.string(),
    dcContactMadeBy: z.string().trim().optional(), 
    tcmDate: dateValidation,
    tcmResults: z.string().min(1, { message: 'Please Select an Option' }),
    tcmResultCheckBox: z.boolean(),
  })
  .refine(
    (data) => data.dcDate !== null,
    {
      message: "Discharge Date is required",
      path: ["dcDate"],
    }
  )
  .refine(
    (data) => {
      const isDisabled = DISABLING_RESULTS.includes(data.tcmResults);
      if (!isDisabled) {
        return data.tcmDate !== null;
      }
      return true; 
    },
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
  )
  .refine(
    (data) => {
      if (data.dcDate && data.tcmDate) {
        const diffInDays = getDateDifference(data.tcmDate,data.dcDate);
        return diffInDays <= 14;
      }
      return true;
    },
    {
      message: "Date cannot be more than 14 days after Discharge Date",
      path: ["tcmDate"],
    }
  )
  .refine(
    (data) => {
      const isDisabled = DISABLING_RESULTS.includes(data.tcmResults);
      if (!isDisabled) {
        return !!data.dcContactMadeBy?.trim(); 
      }
      return true; 
    },
    {
      message: "Please Enter Contact Name",
      path: ["dcContactMadeBy"],
    }
  )
  .refine(
    (data) => data.tcmResultCheckBox === true,
    {
      message: "Review checkbox must be checked",
      path: ["tcmResultCheckBox"],
    }
  );

type TcmWidgetSchemaType = z.infer<typeof tcmWidgetSchema>;

export { tcmWidgetSchema, type TcmWidgetSchemaType };
