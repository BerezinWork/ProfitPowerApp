import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";

// Public Pages
import Home from "./pages/home";
import Login from "./pages/login";

// Private Pages
import Transactions from "./pages/transactions";

// Loaders
import { transactionsLoader } from "./loaders/transactionsLoader.js";

// Components


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
          {
              element: <PublicLayout />,
              children: [
                  {
                      index: true,
                      element: <Home />,
                  },
                  {
                      path: "login",
                      element: <Login />,
                  },
              ]
          },
          {
              element: <PrivateLayout />,
              children: [
                  {
                      path: "transactions",
                      element: <Transactions />,
                      loader: transactionsLoader,
                  },
              ]
          }
      ]
    }
]);

function App() {
  return (<RouterProvider router={router}></RouterProvider>)
}

export default App
