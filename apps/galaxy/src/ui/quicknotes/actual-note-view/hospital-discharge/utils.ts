export const formatKeyValue = (key: string | string[], detail: string): string => {
    let formattedValue = '';
    if (Array.isArray(key)) {
        formattedValue = key.join(', ');
    } else {
        formattedValue = key || '';
    }
    if (detail) {
        formattedValue += formattedValue ? ', ' : '';
        formattedValue += detail;
    }
    return formattedValue;
};
