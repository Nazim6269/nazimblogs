import { stripHTML } from './stripHTML';

export const calculateReadingTime = (htmlBody) => {
    if (!htmlBody) return 1;
    const text = stripHTML(htmlBody);
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(wordCount / 200);
    return Math.max(1, minutes);
};
