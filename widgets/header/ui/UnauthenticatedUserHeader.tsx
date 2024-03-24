import { Nav, NavIconLink, NavItem, NavItemList } from './Nav';
import { NavLink } from './NavLink';

export default function UnauthenticatedUserHeader() {
  return (
    <Nav>
      <NavIconLink href="/">conduit</NavIconLink>
      <NavItemList>
        <NavItem>
          <NavLink href="/" isActive={true}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login" isActive={true}>
            Sign in
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register" isActive={true}>
            Sign up
          </NavLink>
        </NavItem>
      </NavItemList>
    </Nav>
  );
}
