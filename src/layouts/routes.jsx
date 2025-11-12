import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddModel from "../pages/AddModel";
import ViewModels from "../pages/ViewModels";
import ModelDetails from "../pages/ModelDetails";
import UpdateModel from "../pages/UpdateModel";
import ErrorPage from "../pages/ErrorPage";
import MyModels from "../pages/MyModels";
import MainLayout from "./MainLayout";
import MyPurchases from "../pages/MyPurchases";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/add-model",
        element: (
          <PrivateRoute>
            <AddModel />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-purchases",
        element: (
          <PrivateRoute>
            <MyPurchases />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-models",
        element: (
          <PrivateRoute>
            <MyModels />
          </PrivateRoute>
        ),
      },
      {
        path: "/models",
        element: (
          <PrivateRoute>
            <ViewModels />
          </PrivateRoute>
        ),
      },
      {
        path: "/models/:id",
        element: (
          <PrivateRoute>
            <ModelDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-model/:id",
        element: (
          <PrivateRoute>
            <UpdateModel />
          </PrivateRoute>
        ),
      },
      // Always last
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
