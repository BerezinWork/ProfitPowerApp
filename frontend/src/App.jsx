import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";

import Main from "./pages/main";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
          {
              index: true,
              element: <Main />,
          }
      ]
    }
]);

function App() {
  return (<RouterProvider router={router}></RouterProvider>)
}

export default App
