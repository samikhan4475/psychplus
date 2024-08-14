const EVENT_REFERRAL_CREATED = 'referral-created'
const EVENT_REFERRAL_EDITED = 'referral-edited'
const EVENT_TEMPLATE_CREATED = 'template-created'
const EVENT_TEMPLATE_EDITED = 'template-edited'
const EVENT_RELATIONSHIP_CREATED = 'relationship-created'
const EVENT_RELATIONSHIP_UPDATED = 'relationship-updated'
const EVENT_RELATIONSHIP_DELETED = 'relationship-deleted'
const EVENT_LOCK_PATIENT_RELATIONSHIPS = 'lock-patient-relationships'
const EVENT_PATIENT_HISTORY_UPDATED = 'patient-history-updated'

enum EventType {
  Loaded = 'loaded',
  Error = 'error',
  Opened = 'opened',
  Closed = 'closed',
  Size = 'size',
  ClosePopover = 'close-popover',
}

export {
  EventType,
  EVENT_REFERRAL_CREATED,
  EVENT_REFERRAL_EDITED,
  EVENT_TEMPLATE_CREATED,
  EVENT_TEMPLATE_EDITED,
  EVENT_RELATIONSHIP_CREATED,
  EVENT_RELATIONSHIP_UPDATED,
  EVENT_RELATIONSHIP_DELETED,
  EVENT_LOCK_PATIENT_RELATIONSHIPS,
  EVENT_PATIENT_HISTORY_UPDATED,
}
