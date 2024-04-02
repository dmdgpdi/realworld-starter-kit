enum SubLink {
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  SETTING = '/setting',
  ARTICLE = '/article',
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

const isActiveLink = (href: string, pathname: string) => {
  return href === pathname || isActiveMainLink(href, pathname);
};

export { isActiveLink };
