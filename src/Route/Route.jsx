import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ContactPage from "../pages/ContactPage/ContactPage";
import Dashboard from "./Dashboard";
import WriteBlogs from "../pages/Dashboard/WriteBlogs/WriteBlogs";
import Feedback from "../pages/Dashboard/Feedback/Feedback";

const Route = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,

            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path:'/allBlogs',
                element: <AllBlogs></AllBlogs>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/contact',
                element: <ContactPage></ContactPage>
            }
        ]
    },
    {
        path:"/dashboard",
        element: <Dashboard></Dashboard>,
        children:[
            {
                path:"writeBlogs",
                element: <WriteBlogs></WriteBlogs>
            },
            {
                path:'feedback',
                element: <Feedback></Feedback>
            }
        ]
    }
]);

export default Route;