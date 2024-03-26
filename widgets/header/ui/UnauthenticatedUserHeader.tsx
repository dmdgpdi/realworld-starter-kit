import { Nav, NavIconLink, NavItem, NavItemList } from './Nav';
import { NavLink } from './NavLink';

export default function UnauthenticatedUserHeader() {
  return (
    <Nav>
      <NavIconLink href="/">conduit</NavIconLink>
      <NavItemList>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Sign in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register">Sign up</NavLink>
        </NavItem>
      </NavItemList>
    </Nav>
  );
}
