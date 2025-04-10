import { TreatmentTeamTabs } from './treatment-team-tabs'

const TreatmentTeamView = (props: { isProfileView?: boolean }) => {
  return <TreatmentTeamTabs isProfileView={props.isProfileView} />
}

export { TreatmentTeamView }
