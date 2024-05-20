import { NavItem, Nav, NavIconLink, NavItemList, NavIcon } from '@/shared/ui';
import { NavLink } from './NavLink';

export default function AuthenticatedUserHeader({
  userName,
}: AuthenticatedUserHeaderProps) {
  return (
    <Nav>
      <NavIconLink href="/">conduit</NavIconLink>
      <NavItemList>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/editor">
            <NavIcon iconName="ion-compose"></NavIcon>
            New Article
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/settings">
            <NavIcon iconName="ion-gear-a"></NavIcon>
            Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/profile/${userName}`}>{userName}</NavLink>
        </NavItem>
      </NavItemList>
    </Nav>
  );
}

type AuthenticatedUserHeaderProps = { userName: string };
