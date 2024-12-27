'use client';

import {
  LoadingPlaceholder,
  WidgetContainer
} from '@/components';
import { Box } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QuickNotesUploadButton } from '../quicknotes/quicknotes-upload-button';
import { getAllDocumentsAction } from './actions';
import { UploadedDocumentsBlock } from './blocks';
import { DocumentsClearButton } from './documents-clear-button';
import { Documents } from './types';

interface UploadedDocumentTabProps {
  patientId: string;
  uploadedDocumentsData: Documents[];
}

const UploadedDocumentTab = ({
  patientId,
  uploadedDocumentsData,
}: UploadedDocumentTabProps) => {
  const [documents, setDocuments] = useState<Documents[]>(uploadedDocumentsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const appointmentId = useSearchParams().get('id') as string;
  const parsedAppointmentId = Number(appointmentId);
  const parsedPatientId = Number(patientId);
  
  const fetchDocuments = async () => {
    if (!appointmentId || !patientId) return;
    setLoading(true);

    const response = await getAllDocumentsAction({
      data: {
        appointmentId: parsedAppointmentId,
        patientId: parsedPatientId,
        documentType: 'Primary',
      },
      patientId: parsedPatientId,
      appointmentId: parsedAppointmentId,
    });

    if (response.state === 'success') {
      setDocuments(response.data);
    } else {
      setError('Failed to fetch documents');
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleDocumentUpload = (event: MessageEvent) => {
      if (event.data.type === 'quicknotes:uploadDocument') {
        fetchDocuments();
      }
    };
    window.addEventListener('message', handleDocumentUpload);
    return () => {
      window.removeEventListener('message', handleDocumentUpload);
    };
  }, []);

  if (error) return <Box>{error}</Box>;

  return (
    <WidgetContainer
      title="Uploaded Documents"
      headerRight={
        <>
          <QuickNotesUploadButton isWhiteBg={true} isIcon={false} />
          <DocumentsClearButton
            documents={documents}
            patientId={parsedPatientId}
            appointmentId={parsedAppointmentId}
            onClearSuccess={fetchDocuments}
          />
        </>
      }
    >
      {loading ? (
        <LoadingPlaceholder className="bg-white h-full" />
      ) : (
        <UploadedDocumentsBlock
          documents={documents}
          patientId={parsedPatientId}
          appointmentId={parsedAppointmentId}
        />
      )}
    </WidgetContainer>
  );
};

export { UploadedDocumentTab };
