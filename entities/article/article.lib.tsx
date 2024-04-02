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

export { formatDate, appendQueryString };
