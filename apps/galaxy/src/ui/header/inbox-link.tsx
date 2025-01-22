'use client'

import NextLink from 'next/link'
import { MailIcon } from 'lucide-react'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { useStore } from '@/store'

interface InboxLinkProps {
  href: string
  label: string
}

const InboxLink = ({ href, label }: InboxLinkProps) => {
  const addTab = useStore((state) => state.addTab)

  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr11786EnableGalaxySecondPhaseFeatures,
  )

  if (!isFeatureFlagEnabled) return
  return (
    <NextLink
      href={href}
      onClick={() => {
        addTab({
          href: href,
          label,
        })
      }}
      className="flex items-center gap-1 rounded-2 px-1 text-[16px]"
    >
      <MailIcon width={16} height={16} strokeWidth={1.25} />
      Inbox
    </NextLink>
  )
}

export { InboxLink }
