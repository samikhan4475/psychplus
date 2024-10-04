'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Text } from '@radix-ui/themes';

type AddTemplateButtonProps = {
    isCollapsed: boolean;
};

const AddTemplateButton = ({ isCollapsed }: AddTemplateButtonProps) => {

    return (
        <Button
            variant="outline"
            color="gray"
            className={`text-black ${isCollapsed ? 'w-[20px] h-[20px] rounded-full p-0' : 'w-fit h-[24px] py-1 px-2'} flex items-center justify-center`}
        >
            <PlusIcon width="12px" height="12px" />
            {!isCollapsed && <Text className="text-[12px] font-regular">Add New</Text>}
        </Button>
    );
};

export { AddTemplateButton };

