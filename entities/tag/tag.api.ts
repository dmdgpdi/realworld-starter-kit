import { BASE_URL } from '@/shared/api';
import { API } from '@/shared/api';
import { appendUrl } from '@/shared/lib';
import { TagList } from './tag.type';

const getTagList = async (): Promise<TagList> => {
  const url = appendUrl(BASE_URL, API.TAGS);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`${res.status} 번 error 데이터 불러오기 실패`);
  }

  return res.json();
};

export { getTagList };
