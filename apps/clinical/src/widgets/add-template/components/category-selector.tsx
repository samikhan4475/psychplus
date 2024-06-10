import { FormSelect } from "@psychplus/form"
import { useFormContext } from "react-hook-form"
import { useStore } from '@psychplus/reports/store'

const CategorySelector = () => {
    const { register } = useFormContext()
    const reportCategories = useStore((state) => state.reportCategories)
    const categoryOptions = reportCategories?.codes.map((code) => ({
      label: code.displayName,
      value: code.code,
    }))

    return (
        <FormSelect
        label="Category"
        size="2"
        required
        {...register('reportCategoryCode')}
        buttonClassName="h-7 text-[12px]"
        placeholder="select"
        options={categoryOptions}
      />
    )
}

export {CategorySelector}