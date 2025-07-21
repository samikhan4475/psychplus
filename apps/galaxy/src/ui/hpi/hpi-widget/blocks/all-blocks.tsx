import { QuickNoteSectionItem } from "@/types"
import { cn } from "@/utils"
import { Flex } from "@radix-ui/themes"
import { AdhdHyperactiveBlock } from "./adhd-hyperactive-block"
import { AdhdInattentiveBlock } from "./adhd-inattentive-block"
import { AnxietyBlock } from "./anxiety-block"
import { AutismBlock } from "./autism-block"
import { BipolarManiaBlock } from "./bipolar-mania-block"
import { BpdBlock } from "./bpd-block"
import { ChiefComplaintBlock } from "./chief-complaint-block"
import { ConductDisorderBlock } from "./conduct-disorder-block"
import { DementiaBlock } from "./dementia-block"
import { DepressionBlock } from "./depression-block"
import { MedicationSeBlock } from "./medication-se-block"
import { ObsessionBlock } from "./obsession-block"
import { OtherBlock } from "./other-block"
import { PtsdBlock } from "./ptsd-block"
import { SchizophreniaBlock } from "./schizophrenia-block"
import { SubstanceBlock } from "./substance-block"

interface AllBlocksProps {
    data?: QuickNoteSectionItem[]
    disabled?: boolean
}

function AllBlocks({ data, disabled = false }: AllBlocksProps) {
    return (
        <Flex direction={"column"} gap={"2"} className={cn({
            "pointer-events-none": disabled
        })}>
            <ChiefComplaintBlock disabled={disabled} />
            <DepressionBlock disabled={disabled} />
            <AnxietyBlock disabled={disabled} />
            <BipolarManiaBlock disabled={disabled} />
            <PtsdBlock disabled={disabled} />
            <ObsessionBlock disabled={disabled} />
            <BpdBlock disabled={disabled} />
            <SubstanceBlock disabled={disabled} />
            <AdhdInattentiveBlock disabled={disabled} />
            <AdhdHyperactiveBlock disabled={disabled} />
            <AutismBlock disabled={disabled} />
            <ConductDisorderBlock disabled={disabled} />
            <DementiaBlock disabled={disabled} />
            <SchizophreniaBlock disabled={disabled} />
            <MedicationSeBlock disabled={disabled} />
            <OtherBlock data={data} disabled={disabled} />
        </Flex>
    )
}

export default AllBlocks
