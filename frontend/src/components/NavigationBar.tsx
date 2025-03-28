'use client';

import { StoreContext } from '@/store/Store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavDropdown,
  NavLink,
} from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';

const NavigationBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, dispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;
  const router = useRouter();

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    router.push('/signin');
  };

  return (
    <>
      <header>
        <Navbar bg="light" variant="light" expand="lg">
          <Container>
            <Button
              variant="light"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <GiHamburgerMenu />
            </Button>
            <NavbarBrand className="mx-4">
              <NavLink href="/" className="no-underline text-black font-bold">
                <h3> Moyozon</h3>
              </NavLink>
            </NavbarBrand>

            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav" className="mr-6">
              {/* <SearchBox /> */}
              <Nav className="me-auto w-100 justify-content-end">
                <Link href="/cart" className="nav-link">
                  Cart
                  {cart?.cartItems?.length > 0 && (
                    <Badge
                      pill
                      bg="#edcf5d"
                      style={{ backgroundColor: '#edcf5d' }}
                      text="dark"
                    >
                      {cart?.cartItems?.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo && (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="profile">
                      User Profile
                    </NavDropdown.Item>
                    {/* <Link   style={{ textDecoration: 'none', color: 'initial' }} href="/profile"> */}
                    <NavDropdown.Item href="/my-orders">
                      {/* </Link> */}
                      {/* <Link
                        style={{ textDecoration: 'none', color: 'initial' }}
                        href="/my-orders"
                      > */}
                      Order History
                      {/* </Link> */}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      href="#signout"
                      // href="/signin"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                )}
                {!userInfo && (
                  <Link className="nav-link" href="/signin">
                    Sign In
                  </Link>
                )}
                {/* {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <Nav.Link to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </Nav.Link>
                      <Nav.Link to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </Nav.Link>
                      <Nav.Link to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </Nav.Link>
                      <Nav.Link to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </Nav.Link>
                    </NavDropdown>
                  )} */}
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavigationBar;
