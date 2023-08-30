import React from "react";

import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";

import UserAuthContext from "./components/UserAuthContext";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/Home" element={<Home />}></Route>

      {/* <Route index element={<Login></Login>}></Route> */}
    </Route>
  )
);
function App() {
  return (
    <UserAuthContext>
      <RouterProvider router={router}></RouterProvider>
    </UserAuthContext>
  );
}

export default App;
