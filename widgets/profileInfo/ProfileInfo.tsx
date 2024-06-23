import {
  ContainerLayout,
  ResponsiveWidthContainer,
  RowLayout,
} from '@/shared/ui';
import { getBaseImage } from '@/shared/lib';
import { UserInfoLayout, userType, UserImage } from '@/entities/user';
import { FollowUserProfileToggleButton } from '@/features/user/followUserToggle';
import { NavigateUpdateProfileButton } from '@/features/auth';

function ProfileInfo({ profile }: ProfileInfoProps) {
  const { username, image, following, bio } = profile;
  const profileImage = image === '' ? getBaseImage() : image;

  return (
    <UserInfoLayout>
      <ContainerLayout>
        <RowLayout>
          <ResponsiveWidthContainer>
            <UserImage
              src={profileImage}
              alt={`${username}'s profile image`}
              data-cy="user-image"
            />
            <h4 data-cy="username">{username}</h4>
            <p data-cy="user-bio">{bio}</p>
            <FollowUserProfileToggleButton
              username={username}
              initialFollowingValue={following}
              data-cy="follow-button"
            />
            <NavigateUpdateProfileButton
              authorUsername={username}
              data-cy="edit-profile-button"
            />
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
