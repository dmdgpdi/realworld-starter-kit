const objectLength = (object: Object) => {
  return Object.keys(object).length;
};

const isZero = (number: number) => {
  return number === 0;
};

const isEmptyList = (list: unknown[]) => {
  return list.length === 0;
};

const appendHref = (href: string, appendValue: unknown) => {
  return `${href}/${appendValue}`;
};

const appendUrl = (baseUrl: string, ...appendValue: unknown[]) => {
  let url = baseUrl;

  appendValue.forEach(value => {
    url += `/${value}`;
  });

  return url;
};

const isHrefEqualPathname = (href: string, pathname: string) => {
  return href === pathname;
};

const isEmptyString = (text: string) => {
  const trimText = text.trim();

  if (trimText.length === 0) {
    return true;
  }

  return false;
};

const decodeUrl = (encodedString: string) => {
  return decodeURIComponent(encodedString);
};

const FormDataEntryValueToString = (formData: FormDataEntryValue) => {
  return formData instanceof File ? '' : formData;
};

const getBaseImage = () => {
  return '/userProfileImage.jpg';
};

export {
  objectLength,
  isZero,
  isEmptyList,
  appendHref,
  appendUrl,
  isHrefEqualPathname,
  isEmptyString,
  decodeUrl,
  FormDataEntryValueToString,
  getBaseImage,
};

export { getLocalItemWithExpiry, setLocalItemWithExpiry } from './localStorage';
