export const stripHTML = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};
