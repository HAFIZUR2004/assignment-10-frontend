import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "../components/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Banner from "../components/Banner";
import AddModel from "../pages/AddModel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />, // ✅ JSX element আকারে দিতে হবে
      },
      
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      }
      ,
      {
        path:"/add-model",
        element:<AddModel/>
      }
      ,
      {
        path:"/add-model",
        element:<AddModel/>
      }
      ,
      {
        path:"/add-model",
        element:<AddModel/>
      }
    ],
  },
]);

export default router;
