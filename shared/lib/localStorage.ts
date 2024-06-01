'use client';

const getSecond = (time: number) => {
  return time * 1000;
};

const getMinute = (time: number) => {
  return time * 60 * 1000;
};

const getDay = (day: number) => {
  return day * 24 * 60 * 60 * 1000;
};

const setLocalItem = (key: string, item: any) => {
  const jsonItem = JSON.stringify(item);
  localStorage.setItem(key, jsonItem);
};

const getLocalItem = <ItemType>(key: string): ItemType | undefined => {
  const item = localStorage.getItem(key);

  if (!item) {
    return;
  }

  const parseItem = JSON.parse(item);
  return parseItem;
};

const deleteLocalItem = (key: string) => {
  localStorage.removeItem(key);
};

const setLocalItemWithExpiry = (
  key: string,
  item: Object,
  expiryTime: {
    expirySecond?: number;
    expiryInMinute?: number;
    expiryInDay?: number;
  },
) => {
  const { expiryInDay = 0, expiryInMinute = 0, expirySecond = 0 } = expiryTime;

  const now = new Date();
  const totalExpiryTime =
    now.getTime() +
    getSecond(expirySecond) +
    getMinute(expiryInMinute) +
    getDay(expiryInDay);
  setLocalItem(key, { ...item, expiry: totalExpiryTime });
};

const getLocalItemWithExpiry = <ItemType>(
  key: string,
): ItemType | undefined => {
  const item = localStorage.getItem(key);

  if (!item) {
    return undefined;
  }

  const parseItem: ItemType & { expiry?: number } = JSON.parse(item);
  const now = new Date();
  const expiryTime = parseItem?.expiry ?? 0;

  if (now.getTime() > expiryTime) {
    localStorage.removeItem(key);
    return undefined;
  }

  return parseItem;
};

export {
  setLocalItem,
  getLocalItem,
  deleteLocalItem,
  setLocalItemWithExpiry,
  getLocalItemWithExpiry,
};
