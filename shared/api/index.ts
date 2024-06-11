const BASE_URL =
  process.env.IS_MOCKING === 'enable'
    ? 'http://localhost:9090'
    : (process.env.NEXT_PUBLIC_BASE_URL as string);

enum API {
  ARTICLES = 'articles',
  FEED = 'feed',
  TAGS = 'tags',
  PROFILES = 'profiles',
  FOLLOW = 'follow',
  USERS = 'users',
  USER = 'user',
  LOGIN = 'login',
  COMMENTS = 'comments',
  FAVORITE = 'favorite',
}

const checkError = (response: Response) => {
  if (!response.ok) {
    throw new Error(`Something is wrong, Please Retry again.`);
  }
};

type Author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export { BASE_URL, API, checkError };
export type { Author };
