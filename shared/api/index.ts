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
}

export { BASE_URL, API };
