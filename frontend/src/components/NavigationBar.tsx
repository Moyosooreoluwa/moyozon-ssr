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
  console.log(userInfo);

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    router.push('/signin');
    router.replace('/signin');
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
              <NavLink href="/" className="no-underline text-black">
                Moyozon
              </NavLink>
            </NavbarBrand>

            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
              {/* <SearchBox /> */}
              <Nav className="me-auto w-100 justify-content-end">
                <Link href="/cart" className="nav-link">
                  Cart
                  {cart?.cartItems?.length > 0 && (
                    <Badge pill bg="danger">
                      {cart?.cartItems?.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo && (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    {/* <Nav.Link href="/profile"> */}
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                    {/* </Nav.Link> */}
                    {/* <Nav.Link href="/orderhistory"> */}
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                    {/* </Nav.Link> */}
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      href="#signout"
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
