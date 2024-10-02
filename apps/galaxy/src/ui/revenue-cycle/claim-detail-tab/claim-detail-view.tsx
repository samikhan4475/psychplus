interface ClaimDetailViewProps {
  claimId: string
}
const ClaimDetailView = ({ claimId }: ClaimDetailViewProps) => {
  return <h1>Claim Detail View - {claimId}</h1>
}

export { ClaimDetailView }
