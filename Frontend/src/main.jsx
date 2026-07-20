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
import Orders, { ordersLoader } from './Components/Orders.jsx'
import Profile, { profileLoader, profileAction } from './Components/Profile.jsx'
import AdminOrders, { adminOrdersLoader } from './Components/admin/AdminOrders.jsx'
import Messages, { messagesLoader } from './Components/admin/Messages.jsx'
import Register, { registerAction } from './Components/Register.jsx'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from './Components/OrderSuccess.jsx'

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path='/order-success' element={<OrderSuccess/>}/>
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        action={profileAction}
        shouldRevalidate={({ actionResult }) => {
          return !actionResult?.success;
        }}
      />
      <Route path="/orders" element={<Orders />} loader={ordersLoader}/>
      <Route path="/admin/orders" element={<AdminOrders />}  loader={adminOrdersLoader}/>
      <Route path="/admin/messages" element={<Messages />} loader={messagesLoader}/>
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
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
        draggable
        pauseOnHover
        theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
        transition={Bounce}
      />
    </Elements>
  </StrictMode>
);