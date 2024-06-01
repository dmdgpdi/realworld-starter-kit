import {
  ContainerLayout,
  ResponsiveWidthContainer,
  RowLayout,
} from '@/shared/ui';
import { UserInfoLayout, userType, UserImage } from '@/entities/user';
import { FollowUserProfileToggleButton } from '@/features/user/followUserToggle';
import { NavigateUpdateProfileButton } from '@/features/auth';

function ProfileInfo({ profile }: ProfileInfoProps) {
  const { username, image, following, bio } = profile;

  return (
    <UserInfoLayout>
      <ContainerLayout>
        <RowLayout>
          <ResponsiveWidthContainer>
            <UserImage src={image} alt={`${username}'s profile image`} />
            <h4>{username}</h4>
            <p>{bio}</p>
            <FollowUserProfileToggleButton
              username={username}
              initialFollowingValue={following}
            />
            <NavigateUpdateProfileButton authorUsername={username} />
          </ResponsiveWidthContainer>
        </RowLayout>
      </ContainerLayout>
    </UserInfoLayout>
  );
}

export { ProfileInfo };

type ProfileInfoProps = {
  profile: userType.Profile;
};
