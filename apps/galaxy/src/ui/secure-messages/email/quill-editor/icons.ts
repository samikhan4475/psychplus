import { AttachmentIcon, BoldIcon, BulletPointsIcon, DoubleQuteIcon, HeadingIcon, ItalicIcon, LinkIcon, OrderedIcon } from "../../icons";

export const initializeQuillIcons = (Quill: any) => {
    const icons = Quill.import('ui/icons');

    icons['bold'] = BoldIcon({ width: '10.75px', height: '14px' });
    icons['italic'] = ItalicIcon({ width: '12px', height: '14px' });
    icons['header']['1'] = HeadingIcon({ width: '12px', height: '14px' });
    icons['header']['2'] = HeadingIcon({ width: '9px', height: '11px' });
    icons['blockquote'] = DoubleQuteIcon({ width: '14px', height: '10px' });
    icons['link'] = LinkIcon({ width: '12px', height: '14px' });
    icons['list']['bullet'] = BulletPointsIcon({ width: '17.66px', height: '17.66px' });
    icons['list']['ordered'] = OrderedIcon({ width: '18px', height: '15px' });
    icons['attachment'] = AttachmentIcon({ width: '17.61px', height: '16px' });
};
