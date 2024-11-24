import {
  createBrowserRouter,
  RouterProvider,Outlet
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";
import { AuthContextProvider } from "./context/authContext";
// we'll use react router dom outlet
/*<Outlet> should be used in parent route elements to 
render their child route elements. This allows nested UI to
show up when child routes are rendered. If the parent route 
matched exactly, it will render a child index route or 
nothing if there is no index route.*/

// we can't use multiple components without any parent that's why <> is used
const Layout=()=>{
  return(
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}



//creating a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/post/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
    ]
  },
  
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  
]);


function App() {
  return (
    <AuthContextProvider>
      <div className="app">
        <div className="container">
          <RouterProvider router={router}/>
        </div>
      </div>
  </AuthContextProvider>  
  );
}

export default App;
