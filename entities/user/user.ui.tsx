import Image from 'next/image';

function ProfilePageLayout() {
  return <div className="profile-page"></div>;
}

function UserInfoLayout() {
  return <div className="user-info"></div>;
}

function UserImage() {
  return (
    <Image
      alt="userImage"
      width={100}
      height={100}
      src="http://i.imgur.com/Qr71crq.jpg"
      className="user-img"
    />
  );
}

export { ProfilePageLayout, UserInfoLayout, UserImage };
