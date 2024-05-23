'use client';

import { useState } from 'react';
import { useAuth } from '@/entities/auth';
import { FollowUserButton, FollowUserProfileButton } from './FollowUserButtons';
import {
  UnfollowUserButton,
  UnfollowUserProfileButton,
} from './UnfollowUserButtons';
import { useFollow } from '../useFollow';

function FollowUserToggleButton({
  username,
  isFollowing,
}: FollowUserToggleButtonProps) {
  const [isFollowingAuthor, setIsFollowingAuthor] = useState(isFollowing);

  const toggleFollwingAuthor = () => {
    setIsFollowingAuthor(prev => !prev);
  };

  return isFollowingAuthor ? (
    <UnfollowUserButton
      username={username}
      toggleFollowingState={toggleFollwingAuthor}
    />
  ) : (
    <FollowUserButton
      username={username}
      toggleFollowingState={toggleFollwingAuthor}
    />
  );
}

function FollowUserProfileToggleButton({
  username,
  initialFollowingValue,
}: FollowUserProfileToggleButtonProps) {
  const { token } = useAuth();
  const { followUser, isFollowing, unfollowUser } = useFollow(
    token,
    username,
    initialFollowingValue,
  );

  return isFollowing ? (
    <UnfollowUserProfileButton
      username={username}
      unfollowUserFunc={unfollowUser}
    />
  ) : (
    <FollowUserProfileButton username={username} followUserFunc={followUser} />
  );
}

export { FollowUserToggleButton, FollowUserProfileToggleButton };

type FollowUserToggleButtonProps = {
  username: string;
  isFollowing: boolean;
};

type FollowUserProfileToggleButtonProps = {
  username: string;
  initialFollowingValue: boolean;
};
