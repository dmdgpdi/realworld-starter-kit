import Image from 'next/image';
import { LayoutProps } from '@/shared/ui';

function ProfilePageLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="profile-page" {...otherProps}>
      {children}
    </div>
  );
}

function UserInfoLayout({ children, ...otherProps }: LayoutProps) {
  return (
    <div className="user-info" {...otherProps}>
      {' '}
      {children}
    </div>
  );
}

function UserImage({ src, alt = 'user image' }: UserImageProps) {
  return (
    <Image alt={alt} width={100} height={100} src={src} className="user-img" />
  );
}

export { ProfilePageLayout, UserInfoLayout, UserImage };

type UserImageProps = {
  src: string;
  alt?: string;
};
