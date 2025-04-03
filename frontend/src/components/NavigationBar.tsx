// 'use client';

// import { StoreContext } from '@/store/Store';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useContext, useEffect, useState } from 'react';
// import {
//   Badge,
//   Button,
//   Container,
//   Nav,
//   Navbar,
//   NavbarBrand,
//   NavbarCollapse,
//   NavbarToggle,
//   NavDropdown,
//   NavItem,
//   NavLink,
// } from 'react-bootstrap';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import SearchBox from './SearchBox';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { getError } from '@/utils/errorHandler';

// const NavigationBar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const { state, dispatch } = useContext(StoreContext);
//   const { cart, userInfo } = state;
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await axios.get(`/api/products/categories`);
//         setCategories(data);
//       } catch (err) {
//         toast.error(getError(err));
//       }
//     };
//     fetchCategories();
//   }, []);

//   const signoutHandler = () => {
//     dispatch({ type: 'USER_SIGNOUT' });
//     router.push('/signin');
//   };

//   return (
//     <>
//       <div
//         className={
//           sidebarOpen
//             ? 'd-flex flex-column site-container active-cont'
//             : 'd-flex flex-column site-container'
//         }
//       >
//         <header>
//           <Navbar bg="light" variant="light" expand="lg">
//             <Container>
//               <Button
//                 variant="light"
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//               >
//                 <GiHamburgerMenu />
//               </Button>
//               <NavbarBrand className="mx-4">
//                 <NavLink href="/" className="no-underline text-black font-bold">
//                   <h3> Moyozon</h3>
//                 </NavLink>
//               </NavbarBrand>

//               <NavbarToggle aria-controls="basic-navbar-nav" />
//               <NavbarCollapse id="basic-navbar-nav" className="mr-6">
//                 <SearchBox />
//                 <Nav className="me-auto w-100 justify-content-end">
//                   <Link href="/cart" className="nav-link">
//                     Cart
//                     {cart?.cartItems?.length > 0 && (
//                       <Badge
//                         pill
//                         bg="#edcf5d"
//                         style={{ backgroundColor: '#edcf5d' }}
//                         text="dark"
//                       >
//                         {cart?.cartItems?.reduce((a, c) => a + c.quantity, 0)}
//                       </Badge>
//                     )}
//                   </Link>
//                   {userInfo && (
//                     <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
//                       <NavDropdown.Item href="profile">
//                         User Profile
//                       </NavDropdown.Item>
//                       <NavDropdown.Item href="/my-orders">
//                         Order History
//                       </NavDropdown.Item>
//                       <NavDropdown.Divider />
//                       <Link
//                         className="dropdown-item"
//                         href="#signout"
//                         onClick={signoutHandler}
//                       >
//                         Sign Out
//                       </Link>
//                     </NavDropdown>
//                   )}
//                   {!userInfo && (
//                     <Link className="nav-link" href="/signin">
//                       Sign In
//                     </Link>
//                   )}
//                   {userInfo && userInfo.isAdmin && (
//                     <NavDropdown title="Admin" id="admin-nav-dropdown">
//                       <NavDropdown.Item href="/admin/dashboard">
//                         Dashboard
//                       </NavDropdown.Item>
//                       <NavDropdown.Item href="/admin/products">
//                         Products
//                       </NavDropdown.Item>
//                       <NavDropdown.Item href="/admin/orders">
//                         Orders
//                       </NavDropdown.Item>
//                       <NavDropdown.Item href="/admin/users">
//                         Users
//                       </NavDropdown.Item>
//                     </NavDropdown>
//                   )}
//                 </Nav>
//               </NavbarCollapse>
//             </Container>
//           </Navbar>
//         </header>
//         <div
//           className={
//             sidebarOpen
//               ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column min-h-screen'
//               : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
//           }
//         >
//           <Nav className="flex-column text-black w-100 p-2">
//             <Nav.Item className="mt-6">
//               <strong>Categories</strong>
//             </Nav.Item>
//             {categories.map((category) => (
//               <NavItem key={category} className="my-6">
//                 <Link
//                   href={`/search?category=${category}`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   {category}
//                 </Link>
//               </NavItem>
//             ))}
//           </Nav>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NavigationBar;

'use client';

import { StoreContext } from '@/store/Store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
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
  NavItem,
  NavLink,
} from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import SearchBox from './SearchBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '@/utils/errorHandler';

const NavigationBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { state, dispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    router.push('/signin');
  };

  return (
    <>
      <div
        className={`flex flex-col  transition duration-500
 ${sidebarOpen ? ' ml-[240px]' : ''}`}
      >
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
                <SearchBox />
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
                      <NavDropdown.Item href="/my-orders">
                        Order History
                      </NavDropdown.Item>
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
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <NavDropdown.Item href="/admin/dashboard">
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admin/products">
                        Products
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admin/orders">
                        Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admin/users">
                        Users
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </NavbarCollapse>
            </Container>
          </Navbar>
        </header>
        {/* <div
          className={` w-[240px] absolute left-[-300px] bg-[#ededed] transition duration-500
 z-[1000] h-full flex flex-col justify-between flex-wrap ${
   sidebarOpen ? 'active-nav left-0' : ''
 } text-black p-2 ${sidebarOpen ? 'min-h-screen h-full' : ''}`}
        > */}
        <div
          className={`pl-6 pr-1 fixed top-0 left-0 h-full min-h-screen bg-white shadow-lg transition-transform duration-500 z-[1000] 
    ${
      sidebarOpen
        ? 'translate-x-0 w-screen md:w-[240px]'
        : '-translate-x-full w-[240px]'
    }
  `}
        >
          <Nav className="flex-col w-full">
            <Nav.Item className="mt-6">
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <NavItem key={category} className="my-6">
                <Link
                  href={`/search?category=${category}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {category}
                </Link>
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
