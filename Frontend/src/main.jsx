import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import About from './Components/About.jsx'
import Contact, { contactAction } from './Components/Contact.jsx'
import Login, { loginAction } from './Components/Login.jsx'
import Cart from './Components/Cart.jsx'
import Home, { productsLoader } from './Components/Home.jsx'
import ErrorPage from './Components/ErrorPage.jsx'
import ProductDetail from './Components/ProductDetail.jsx'
import { CartProvider } from './store/cart-context.jsx'
import { AuthProvider } from './store/auth-context.jsx'
import CheckoutForm from './Components/CheckoutForm.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'




const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />

    <Route element={<ProtectedRoute/>}>
      <Route path="/checkout" element={<CheckoutForm/>}/>
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <CartProvider>
      <RouterProvider router={appRouter} />
    </CartProvider>
    </AuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </StrictMode>
)
