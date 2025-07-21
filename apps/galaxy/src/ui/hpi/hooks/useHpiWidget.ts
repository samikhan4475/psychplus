import { QuickNoteSectionItem } from "@/types";
import { filterAndSort } from "@/utils";
import { useFormContext } from "react-hook-form";
import { useHpiHistoryStore } from "../hpi-history-dialog/store";
import { transformIn } from "../hpi-widget/data";

export type SectionItem = {
  sectionItem: string;
  sectionItemValue?: string;
};

export const useHpiWidget = () => {
  const form = useFormContext();
  const { selectedHistory, history } = useHpiHistoryStore();

  const applyInitialValues = (data: QuickNoteSectionItem[]) => {
    const [filteredData] = filterAndSort(data ?? [], 'hpiOther');
    const initialValue = transformIn(filteredData);

    if (!initialValue) return;

    for (const [key, value] of Object.entries(initialValue)) {
      form.setValue(key as keyof typeof initialValue, value);
    }
  };

  const updateFormValues = () => {
    if (selectedHistory && 'data' in selectedHistory && selectedHistory.data) {
      applyInitialValues(selectedHistory.data);
    }
  };

  const resetToLatestHistory = () => {
    const lastHistory = history[0];
    if (lastHistory?.data) {
      applyInitialValues(lastHistory.data);
    }
  };

  const getAllValues = () => {
    return form.getValues();
  };


  const getFormattedValues = (): SectionItem[] => {
    const values = getAllValues();
    const result: SectionItem[] = [];

    for (const key in values) {
      const value = values[key];

      if (Array.isArray(value) && value.length > 0 && key.endsWith("Values")) {
        result.push({
          sectionItem: key,
          sectionItemValue: value.join(","),
        });
      }

      else if (Array.isArray(value) && value.length > 0) {
        value.forEach((item: string) => {
          const match = item.match(/^([a-z]+)([A-Z].*)$/);
          let sectionItem = "";
      
          if (match) {
            const prefix = match[1].toUpperCase();
            const rest = match[2];
            sectionItem = `${prefix}_${rest}`;
          } else {
            sectionItem = item;
          }
      
          if (sectionItem === "AUT_DelayedMilestones") {
            sectionItem = "AUT_Fidgeting";
          } else if (sectionItem === "CC_Bipolar/Mania") {
            sectionItem = "CC_Bipolar";
          }
      
          result.push({ sectionItem });
        });
      }
      

      else if (typeof value === "string" && value.trim() !== "") {
        result.push({
          sectionItem: key,
          sectionItemValue: value.trim(),
        });
      }
    }

    return result;
  };





  return {
    updateFormValues,
    resetToLatestHistory,
    getAllValues,
    getFormattedValues,
  };
};
