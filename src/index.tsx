import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/sass/my.scss";
import "./assets/font-awesome/all.min.css";

import MainLayout from "./Layouts/MainLayout";
import MainPage from "./Components/Pages/MainPage";
import SecondPage from "./Components/Pages/SecondPage";
import ErrorPage from "./Components/Pages/ErrorPage";

import pivoStore from "./store/pivoStore";
import { Provider } from "react-redux";
import ItemPage from "./Components/Pages/itemPage";

const Mrouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "second",
        element: <SecondPage />,
      },
      {
        path: "items/:itemId/price/:priceId/stars/:starsId",

        element: <ItemPage />,
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
