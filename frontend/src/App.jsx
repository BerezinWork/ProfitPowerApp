import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Layouts
import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";

// Public Pages
import AboutUs from "./pages/about-us";
import Login from "./pages/login";
import SignUp from "./pages/signUp";

// Private Pages
import Home from "./pages/home";
import Transactions from "./pages/transactions";
import Transaction from "./pages/transaction";
import Categories from "./pages/categories";
import AddTransaction from "./pages/addTransaction";


// Loaders
import { transactionsLoader } from "./loaders/transactionsLoader.js";
import { transactionByIdLoader } from "./loaders/transactionByIdLoader.js";
import { categoriesLoader } from "./loaders/categoriesLoader.js";

// Components


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404</div>,
      children: [
          {
              element: <PublicLayout />,
              children: [
                  {
                      index: true,
                      element: <AboutUs />,
                  },
                  {
                      path: "login",
                      element: <Login />,
                  },
                  {
                      path: "registration",
                      element: <SignUp />,
                  },
              ]
          },
          {
              element: <PrivateLayout />,
              children: [
                  {
                      path: "home",
                      element: <Home />,
                      loader: transactionsLoader,
                  },
                  {
                      path: "transactions",
                      element: <Transactions />,
                      loader: transactionsLoader,
                  },
                  {
                      path: "transactions/:id",
                      element: <Transaction />,
                      loader: transactionByIdLoader,
                  },
                  {
                      path: "categories",
                      element: <Categories mode="manage"/>,
                      loader: categoriesLoader,
                  },
                  {
                      path: "add-transaction",
                      children: [
                          {
                              path: "select-category",
                              element: <Categories mode="select"/>,
                              loader: categoriesLoader,
                          },
                          {
                              path: "create/:categoryId",
                              element: <AddTransaction />,
                          },
                          {
                              index: true,
                              element: <Navigate to="select-category" replace />,
                          }
                      ]
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
