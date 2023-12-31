import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/sass/my.scss";
import "./assets/font-awesome/all.min.css";

import MainLayout from "./Layouts/MainLayout";
import ErrorPage from "./Components/Pages/ErrorPage";

import pivoStore from "./store/pivoStore";
import { Provider } from "react-redux";
import PivoSpinner from "./Components/UI/Spinner/pivoSpinner";
import CheckAuth from "./HOC/checkAuth";
import CheckIsLogin from "./HOC/checkIsLogin";

//----------------------------------------------------------------------------
const ItemPageComponent = React.lazy(
  () => import("./Components/Pages/itemPage")
);
const MainPageComponent = React.lazy(
  () => import("./Components/Pages/MainPage")
);

const LoginPageComponent = React.lazy(
  () => import("./Components/Pages/loginPage")
);

const FavoritesPageComponent = React.lazy(
  () => import("./Components/Pages/favoritesPage")
);

const ECartComponent = React.lazy(() => import("./Components/Pages/eCartPage"));

const OrdersPageComponent = React.lazy(
  () => import("./Components/Pages/ordersPage")
);
//----------------------------------------------------------------------------

const Mrouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PivoSpinner text="загрузка..." />}>
            <MainPageComponent />
          </Suspense>
        ),
      },
      {
        path: "favorites",
        element: (
          <CheckAuth>
            <Suspense fallback={<PivoSpinner text="загрузка..." />}>
              <FavoritesPageComponent />
            </Suspense>
          </CheckAuth>
        ),
      },
      {
        path: "eCart",
        element: (
          <CheckAuth>
            <Suspense fallback={<PivoSpinner text="загрузка eCart..." />}>
              <ECartComponent />
            </Suspense>
          </CheckAuth>
        ),
      },
      {
        path: "items/:itemId",
        element: (
          <Suspense fallback={<PivoSpinner text="загрузка..." />}>
            <ItemPageComponent />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <CheckAuth>
            <Suspense fallback={<PivoSpinner text="загрузка..." />}>
              <OrdersPageComponent />
            </Suspense>
          </CheckAuth>
        ),
      },
      {
        path: "login",
        element: (
          <CheckIsLogin>
            <Suspense fallback={<PivoSpinner text="загрузка компонента..." />}>
              <LoginPageComponent />
            </Suspense>
          </CheckIsLogin>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={pivoStore}>
    <RouterProvider router={Mrouter} />
  </Provider>
  // </React.StrictMode>
);
