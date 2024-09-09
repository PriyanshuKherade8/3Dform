import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AddForm from "./Pages/FormPage/AddForm";
import queryClient from "./queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import ModelForm from "./Pages/ModelPage/ModelForm.js";
import ModelList from "./Pages/ModelPage/ModelList.js";
import MiniDrawer from "./Pages/Dashboard/MiniDrawer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MiniDrawer />,
    children: [
      {
        index: true,
        element: <ModelList />,
      },
      {
        path: "add-form-model",
        element: <ModelForm />,
      },
      {
        path: "edit-model/:id",
        element: <ModelForm />,
      },
      {
        path: "experience-list",
        element: <>{"hiii"}</>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
