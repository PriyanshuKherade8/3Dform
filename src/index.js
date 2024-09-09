import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AddForm from "./Pages/FormPage/AddForm";
import queryClient from "./queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import ModelForm from "./Pages/ModelPage/ModelForm.js";
import ModelList from "./Pages/ModelPage/ModelList.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ModelList />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/add-form-model",
    element: <ModelForm />,
  },
  {
    path: "/edit-model/:id",
    element: <ModelForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
