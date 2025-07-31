'use client';

import { getAllDocumentsAction } from '@/ui/uploaded-documents/actions';
import { Documents } from '@/ui/uploaded-documents/types';
import { useEffect, useState } from 'react';
import { BlockContainer, LabelAndValue } from '../shared';
import { QuickNoteSectionName } from '../../constants';

interface UploadedDocumentProps {
  data: Documents[];
  appointmentId: string;
  patientId: string;
}

const Details = ({ data, appointmentId, patientId }: UploadedDocumentProps) => {
  const [documents, setDocuments] = useState<Documents[]>(data);
  const parsedAppointmentId = Number(appointmentId);
  const parsedPatientId = Number(patientId);

  const fetchUploadedDocuments = async () => {
    if (!appointmentId || !patientId) return;

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
    }
  };

  useEffect(() => {
    const handleDocumentUpload = (event: MessageEvent) => {
      const { type, widgetId } = event.data
      if (type === 'widget:save' && widgetId === QuickNoteSectionName.QuicknoteSectionUploadedDocuments) {
        fetchUploadedDocuments();
      }
    };
    window.addEventListener('message', handleDocumentUpload);
    return () => {
      window.removeEventListener('message', handleDocumentUpload);
    };
  }, []);

  useEffect(() => {
  setDocuments(data);
}, [data]);

  if (!documents.length) return null;

  const fileNames = documents?.map(item => item.fileName).join(", ");

  return (
    <BlockContainer heading="Upload">
      <LabelAndValue value={fileNames} />
    </BlockContainer>
  );
};

export { Details };
