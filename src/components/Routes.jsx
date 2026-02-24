import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/RootLayout";
import AuthGuard from "../guard/AuthGuard";

import Home from "../pages/Home";
import Category from "./Category";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Bill from "./Bill";
import Orders from "./Orders";

import AdminDashboard from "../pages/AdminDashboard";
import ManageUsers from "../pages/ManageUsers";

import Login from "./Login";
import Registration from "./Registration";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  // PUBLIC ROUTES (NO NAVBAR)
  { path: "/login", element: <Login /> },
  { path: "/registration", element: <Registration /> },

  // PROTECTED ROUTES
  {
    element: <AuthGuard />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/category", element: <Category /> },
          { path: "/product", element: <Product /> },
          { path: "/product-detail/:id", element: <ProductDetail /> },
          { path: "/about", element: <About /> },
          { path: "/contact", element: <Contact /> },
          { path: "/cart", element: <Cart /> },
          { path: "/checkout", element: <Checkout /> },

          // BILL ROUTES
          { path: "/bill", element: <Bill /> },             // user latest order
          { path: "/bill/:orderId", element: <Bill /> },   // admin specific order

          { path: "/orders", element: <Orders /> },

          // ADMIN
          { path: "/admin", element: <AdminDashboard /> },
          { path: "/manageusers", element: <ManageUsers /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
