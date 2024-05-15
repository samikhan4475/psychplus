type ActivityType =
  | 'new-message'
  | 'new-rx'
  | 'new-lab-results'
  | 'new-visit-notes'

interface NewMessageMetadata {
  from: string
}

interface NewRxMetadata {
  name: string
}

interface NewVisitNotesMetadata {
  provider: string
  date: string
}

interface ActivityBase {
  id: string
  type: ActivityType
  datetime: string
}

interface NewMessageActivity extends ActivityBase {
  type: 'new-message'
  metadata: NewMessageMetadata
}

interface NewRxActivity extends ActivityBase {
  type: 'new-rx'
  metadata: NewRxMetadata
}

interface NewLabResultsActivity extends ActivityBase {
  type: 'new-lab-results'
}

interface NewVisitNotesActivity extends ActivityBase {
  type: 'new-visit-notes'
  metadata: NewVisitNotesMetadata
}

type Activity =
  | NewMessageActivity
  | NewRxActivity
  | NewLabResultsActivity
  | NewVisitNotesActivity

export type {
  Activity,
  ActivityType,
  NewMessageActivity,
  NewRxActivity,
  NewLabResultsActivity,
  NewVisitNotesActivity,
}
