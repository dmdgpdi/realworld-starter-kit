type Profile = {
  username: string;
  bio: string;
  image: string;
  following: true;
};

type ProfileResponse = {
  profile: Profile;
};

export type { Profile, ProfileResponse };
