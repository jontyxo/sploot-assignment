
import './App.css';
import Homepage from './pages/homepage/homepage';
import Login from './pages/login/login';
import { createBrowserRouter,createRoutesFromElements,Route,Link,Outlet,RouterProvider } from "react-router-dom";
import { useSelector } from 'react-redux';


function App() {
  const authToken=useSelector((state)=>state.user.authToken)

   const router=createBrowserRouter(
    createRoutesFromElements(
             <Route >
               <Route index element={authToken? <Homepage />:<Login />} />
        <Route path="/blog" element= {authToken ? <Homepage />:<Login />} />
             </Route>
    )
   )

  return (
   <div>
   <RouterProvider router={router} />
   </div>
  );
}

export default App;
