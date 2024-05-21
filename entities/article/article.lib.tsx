import { Query } from './article.type';

const formatDate = (stringDate: string) => {
  const date = new Date(stringDate);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString(undefined, options);
  return formattedDate;
};

const appendQueryString = (url: string, query: Query) => {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    queryParams.append(key, value.toString());
  }

  return url.concat(`?${queryParams.toString()}`);
};

const addText = (prevText: string, text: string): string => {
  if (prevText.length === 0) {
    return text;
  }
  return `${prevText} ${text}`;
};

const deleteText = (prevText: string, text: string): string => {
  const curTagList = prevText.split(' ');
  const deleteTagIndex = curTagList.indexOf(text);

  if (deleteTagIndex !== -1) {
    curTagList.splice(deleteTagIndex, 1);
  }

  return curTagList.join(' ');
};

const textToArray = (text: string | null | undefined) => {
  if (!text) {
    return [];
  }

  return text.split(' ');
};

const stringArrayToText = (array: string[]) => {
  if (array.length === 0) {
    return '';
  }

  return array.join(' ');
};

const getCorrectPage = (paramPage: string) => {
  const articlePage = parseInt(paramPage, 10);
  const correctPage =
    Number.isNaN(articlePage) || articlePage < 1 ? 1 : articlePage;

  return correctPage;
};

export {
  formatDate,
  appendQueryString,
  addText,
  deleteText,
  textToArray,
  stringArrayToText,
  getCorrectPage,
};
