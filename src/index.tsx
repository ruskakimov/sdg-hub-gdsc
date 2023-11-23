import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import ContentPage from "./pages/content/ExplorePage";
import Professor from "./pages/professor/Professor";
import Student from "./pages/student/Student";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect("explore"),
      },
      {
        path: "explore",
        element: <ContentPage />,
      },
      {
        path: "professor",
        element: <Professor />,
      },
      {
        path: "student",
        element: <Student />,
      },
    ],
  },
  {
    path: "sign-in",
    element: <LoginPage />,
  },
  {
    path: "sign-up",
    element: <LoginPage isSignup />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{ duration: 5000 }}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
