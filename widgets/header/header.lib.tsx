enum SubLink {
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  SETTING = '/setting',
  ARTICLE = '/article',
  EDITOR = '/editor',
}

const isActiveMainLink = (href: string, pathname: string) => {
  const isMainLink = href === '/';

  if (!isMainLink) {
    return false;
  }

  for (const value of Object.values(SubLink)) {
    if (pathname.startsWith(value)) {
      return false;
    }
  }

  return true;
};

const isActiveProfileLink = (href: string, pathname: string) => {
  const isProfileLink = href.startsWith('/profile');

  if (!isProfileLink) {
    return false;
  }

  return pathname.startsWith('/profile');
};

const isActiveLink = (href: string, pathname: string) => {
  return (
    href === pathname ||
    isActiveMainLink(href, pathname) ||
    isActiveProfileLink(href, pathname)
  );
};

export { isActiveLink };
