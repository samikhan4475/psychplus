import { Text } from "@radix-ui/themes";

const StatusComp = ({ row }: { row: any }) => {
    const text = row?.original?.orderStatus;
    let classes = 'px-2 rounded-2';
    if (text === 'Received') {
        classes += ' bg-[#006B3BE7] border border-[#02BA3C16] text-[#02BA3C16] text-1';
    } else if (['Completed', 'Pending', 'Draft', "Cancelled", "OnHold"].includes(text)) {
        classes += ' bg-[#054DFF07] border border-[#00259ECB] text-[#00259ECB] text-1';
    }
    return <Text className={classes}>{text}</Text>;
};

export { StatusComp };