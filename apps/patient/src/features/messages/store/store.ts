import { create } from 'zustand'
import { Messages } from '../types'

const dummyData: Messages[] = [
  {
    id: 1,
    name: 'Billing Team',
    content:
      "Dear Dr. John Smith,\nI hope this email finds you well. I am reaching out to discuss a patient case that I believe could benefit from your expertise.\nI recently saw a patient, [Patient's Name], who presents with [brief description of patient's condition or symptoms]. After conducting a thorough examination and reviewing their medical history, I have identified [diagnosis or preliminary assessment].",
    date: '2025-05-15T00:00:00',
    isMine: false,
  },
  {
    id: 2,
    name: 'Treatment Team',
    content: 'Dear Dr. John Smith,\nI hope this email finds you well.',
    date: '2025-05-16T00:00:00',
    isMine: false,
  },
  {
    id: 3,
    name: 'You',
    content:
      "Dear Dr. John Smith,\nI hope this email finds you well. I am reaching out to discuss a patient case that I believe could benefit from your expertise.\nI recently saw a patient, [Patient's Name], who presents with [brief description of patient's condition or symptoms]. After conducting a thorough examination and reviewing their medical history, I have identified [diagnosis or preliminary assessment].",

    date: '2025-05-17T00:00:00',
    isMine: true,
  },
  {
    id: 4,
    name: 'You',
    content: 'Awesome! Thanks. I’ll look at this today.',
    date: '2025-05-17T00:00:00',
    isMine: true,
  },
  {
    id: 5,
    name: 'You',
    content:
      "Dear Dr. John Smith,\nI hope this email finds you well. I am reaching out to discuss a patient case that I believe could benefit from your expertise.\nI recently saw a patient, [Patient's Name], who presents with [brief description of patient's condition or symptoms]. After conducting a thorough examination and reviewing their medical history, I have identified [diagnosis or preliminary assessment].",

    date: '2025-05-18T00:00:00',
    isMine: true,
  },
  {
    id: 6,
    name: 'You',
    content:
      "Dear Dr. John Smith,\nI hope this email finds you well. I am reaching out to discuss a patient case that I believe could benefit from your expertise.\nI recently saw a patient, [Patient's Name], who presents with [brief description of patient's condition or symptoms]. After conducting a thorough examination and reviewing their medical history, I have identified [diagnosis or preliminary assessment].",

    date: '2025-05-21T00:00:00',
    isMine: true,
  },
  {
    id: 7,
    name: 'You',
    content:
      "Dear Dr. John Smith,\nI hope this email finds you well. I am reaching out to discuss a patient case that I believe could benefit from your expertise.\nI recently saw a patient, [Patient's Name], who presents with [brief description of patient's condition or symptoms]. After conducting a thorough examination and reviewing their medical history, I have identified [diagnosis or preliminary assessment].",

    date: '2025-05-21T00:00:00',
    isMine: true,
  },
]

interface Store {
  messages: Messages[]
}

const useStore = create<Store>()((set, get) => ({
  messages: dummyData,
}))

export { useStore }
