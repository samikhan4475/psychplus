import { unstable_noStore as noStore } from 'next/cache';
import { CodingWidgetClient } from './coding-widget.client';

const CodingWidgetServer = () => {
    noStore();
    return <CodingWidgetClient />
}

export { CodingWidgetServer };