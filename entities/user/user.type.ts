type User = {
  username: 'string';
  bio: 'string';
  image: 'string';
  following: true;
};

type ProfileResponse = {
  profile: User;
};

export type { User, ProfileResponse };
