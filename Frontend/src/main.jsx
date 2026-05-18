import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import About from './Components/About.jsx'
import Contact from './Components/Contact.jsx'
import Login from './Components/Login.jsx'
import Cart from './Components/Cart.jsx'
import Home from './Components/Home.jsx'
import ErrorPage from './Components/ErrorPage.jsx'


const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cart" element={<Cart />} />
    {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
