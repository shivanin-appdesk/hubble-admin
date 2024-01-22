import Home from "./Pages/Home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useParams,
} from "react-router-dom";
import Users from "./Pages/Users/Users";
import Products from "./Pages/Products/Products";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Menu from "./Components/Menu/Menu";

import "./styles/global.scss";
import User from "./Pages/user/User";
import Product from "./Pages/product/Product";
import Artist from "./Pages/Artist/Artist";
import SignUp from "./Pages/SignUp/SignUP";
import { setAuthToken } from "./auth/helper";
import CardComponent from "./Pages/Cards/Card";
import CardList from "./Pages/Cards/CardList";




const token = localStorage.getItem("token");
const isAuthenticated = !!token;

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Navbar />
            <Outlet />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  };

const RenderCardRoute = () => {
  const { id } = useParams<{ id?: string }>();
  const safeId = id || "";
  return <CardList data={[]} />;
};


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/bookings",
          element: <Products />,
        },

        {
          path: "/artist",
          element: <Artist />,
        },
        {
          path: "/bookings/:id/card",
          element: <RenderCardRoute />, 
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <SignUp />,
    },
    // {
    //   path: "/SignUp",
    //   element: isAuthenticated ? <Navigate to="/" /> : <SignUp />,
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
