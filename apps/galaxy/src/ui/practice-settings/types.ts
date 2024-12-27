
enum PracticeSettingsTab {
  SCHEDULING = 'Scheduling',
  CREDENTIALING = 'Credentialing',
  USERS = 'Users',
}

interface Credentialing {
  manager: string
  addedOn: string
}


export {
  PracticeSettingsTab,
  type Credentialing
};

