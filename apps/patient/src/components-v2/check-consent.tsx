'use client'

import { useEffect, useState } from 'react'
import { Consent, DocumentType, PolicyType } from '@psychplus-v2/types'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import { addPolicyConsent } from '@/actions'
import { useToast } from '@/providers'
import { ConsentView } from './consent-view'
import { FormError } from './form'

type CheckConsentsProps = {
  userConsents: Consent[]
}

type PolicyMeta = { slug: DocumentType; name: string }

const CONSENT_DOCUMENT_MAP: Record<PolicyType, PolicyMeta[]> = {
  PolicyA: [
    {
      slug: DocumentType.PRIVACY_POLICY,
      name: 'Privacy Policy',
    },
    {
      slug: DocumentType.TERMS_AND_CONDITIONS,
      name: 'Terms of Service',
    },
  ],
  PolicyB: [
    {
      slug: DocumentType.PATIENT_SERVICE_AGREEMENT,
      name: 'Patient Service Agreement',
    },
    {
      slug: DocumentType.PRIVACY_PRACTICE,
      name: 'Notice of Privacy Practice',
    },
    {
      slug: DocumentType.CONSENT_FOR_TREATMENT,
      name: 'Consent for Treatment',
    },
  ],
}

const CheckConsents = ({ userConsents }: CheckConsentsProps) => {
  const policiesRequireConsent = userConsents.filter(
    (uc) => uc.isNeedsNewSignature,
  )

  const [open, setOpen] = useState(false)
  const [showConsentView, setShowConsentView] = useState({
    visible: false,
    type: DocumentType.PRIVACY_PRACTICE,
  })
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const requiredConsentDocuments = policiesRequireConsent.flatMap(
    (p) => CONSENT_DOCUMENT_MAP[p.type],
  )

  useEffect(() => {
    setOpen(policiesRequireConsent.length > 0)
  }, [])

  const onAgree = async () => {
    setLoading(true)
    const result = await Promise.all(
      policiesRequireConsent.map((policy) =>
        addPolicyConsent({
          type: policy.type,
        }),
      ),
    )

    if (result.some((r) => r.state === 'error')) {
      setLoading(false)
      return setError('Failed to update consents')
    }

    toast({
      title: 'Consents updated',
      type: 'success',
    })
    setOpen(false)
  }

  return (
    <>
      <ConsentView
        open={showConsentView.visible}
        setOpen={(open) => {
          setShowConsentView({ ...showConsentView, visible: open })
        }}
        documentType={showConsentView.type}
      />
      <AlertDialog.Root open={open} onOpenChange={(open) => setOpen(open)}>
        <AlertDialog.Content className="relative max-w-[700px]">
          <AlertDialog.Title className="font-sans -tracking-[0.25px]">
            We&apos;ve made some changes
          </AlertDialog.Title>
          <FormError message={error} />
          <AlertDialog.Description size="3" className="text-slate-11">
            We&apos;ve made updates to some of our policy and consents and
            encourage you to review the updates in full. Your continued use of
            our products and services means you agree and acknowledge the
            changes.{' '}
            {requiredConsentDocuments.map((consentDocument, index) => (
              <Button
                key={consentDocument.slug}
                className="bg-transparent pr-3 pt-[4px]"
                variant="ghost"
                onClick={() =>
                  setShowConsentView({
                    visible: true,
                    type: consentDocument.slug,
                  })
                }
              >
                <Text size="3">{consentDocument.name}</Text>
                {index < requiredConsentDocuments.length - 1 && ','}
              </Button>
            ))}
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Button
              disabled={loading}
              color="gray"
              highContrast
              onClick={onAgree}
            >
              I Agree
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export { CheckConsents, CONSENT_DOCUMENT_MAP, type PolicyMeta }
