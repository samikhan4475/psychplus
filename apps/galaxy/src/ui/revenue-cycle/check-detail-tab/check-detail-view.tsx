interface CheckDetailViewProps {
  checkId: string
}
const CheckDetailView = ({ checkId }: CheckDetailViewProps) => {
  return <h1>Check Detail View - {checkId}</h1>
}

export { CheckDetailView }
