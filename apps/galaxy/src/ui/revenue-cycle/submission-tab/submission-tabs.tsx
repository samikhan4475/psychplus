'use client'
import React from 'react'
import { Tabs } from '@radix-ui/themes'
import { cn } from '@/utils'
import { TabValue } from './submission-tab-view'
const tabButtonClasses =
  'text-[12px] data-[state=active]:font-[510] data-[state=active]:before:bg-pp-bg-primary'
const SubmissionTabs = () => {
  return (
    <Tabs.List
      className={cn(
        'items-center gap-x-2 pl-[17px] h-fit [box-shadow:none]',
      )}
    >
      <Tabs.Trigger
        className={tabButtonClasses}
        value={TabValue.ElectronicSubmission}
      >
        Electronic Submission
      </Tabs.Trigger>
      <Tabs.Trigger
        className={tabButtonClasses}
        value={TabValue.PaperSubmission}
      >
        Paper Submission
      </Tabs.Trigger>
      <Tabs.Trigger
        className={tabButtonClasses}
        value={TabValue.SubmissionHistory}
      >
        Submission History
      </Tabs.Trigger>
    </Tabs.List>
  )
}
export { SubmissionTabs }
