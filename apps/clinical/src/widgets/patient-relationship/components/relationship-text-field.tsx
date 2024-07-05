import { PatientRelationship } from '@psychplus/patient'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useRelationshipCodesIndex } from '../hooks'
import { CODE_NOT_SET } from '@psychplus/codeset'

const RelationshipTextField = ({row: {original: relationship}}: PropsWithRow<PatientRelationship>) => {
    const relationshipCodeIndex = useRelationshipCodesIndex()
    return (
        <TableCellText
        className="text-[12px]"
        text={relationshipCodeIndex[relationship.guardianRelationshipCode?? CODE_NOT_SET]}
      />
    )
}
  
export { RelationshipTextField }