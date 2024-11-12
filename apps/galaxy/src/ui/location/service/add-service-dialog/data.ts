import { VisitDataType } from "../type";

export const QuestionsData = [
  {
    label: "PsychPlus Policy Required",
    name: "psychplus-policy",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    label: "EHR Use Preferences",
    name: "ehr-preferences",
    defaultValue: "ehr-coding",
    options: [
      { label: "EHR + Coding", value: "ehr-coding" },
      { label: "Coding Only", value: "coding-only" },
    ],
  },
  {
    label: "Send provider reminder for notes",
    name: "provider-reminder",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    label: "Send patient reminder for visits",
    name: "patient-reminder",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    label: "Are patient potentially seen every day on this service",
    name: "daily-visit",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    label: "Automatically bill for this service",
    name: "auto-bill",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
];

export const visitData: VisitDataType[] = [
  { id: "1", visitType: "Outpatient Office Visit" },
  { id: "2", visitType: "Outpatient Office Visit" },
  { id: "3", visitType: "Outpatient Office Visit" },
  { id: "4", visitType: "Outpatient Office Visit" },
  { id: "5", visitType: "Outpatient Office Visit" },
];
