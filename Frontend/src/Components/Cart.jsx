import React, { useMemo } from 'react';
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import emptyCartImage from "../assets/util/emptycart.png";
import { useCart } from "../store/cart-context";
import CartTable from "./CartTable";
import { motion } from "motion/react";

const Cart = () => {
  const { cart } = useCart();

  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  }, [cart]);

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 md:py-20 bg-normalbg dark:bg-darkbg transition-colors duration-300 relative overflow-hidden">
      
      {/* High-End Ambient Radial Light Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0">
        <div className="absolute top-[5%] left-[15%] w-[32rem] h-[32rem] bg-primary/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-light/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Centered Header Block */}
        <div className="mb-12 text-center flex flex-col items-center justify-center border-b border-light/20 dark:border-gray-800 pb-6">
          <PageTitle title="Your Shopping Cart" />
          <p className="text-[14px] font-medium text-gray-400 dark:text-lighter/40 mt-1.5 tracking-wide max-w-md">
            Review your selected stickers and premium items
          </p>
        </div>

        {!isCartEmpty ? (
          /* Modern Split Screen Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Product Dashboard Listing */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800/80 border border-light/30 dark:border-gray-700/50 shadow-xl rounded-2xl p-6 backdrop-blur-md transition-all duration-300">
              <CartTable />
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                <Link
                  to="/home"
                  className="inline-flex items-center text-[14px] font-bold text-primary dark:text-light hover:opacity-80 group tracking-wide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Premium Sticky Checkout Board */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-800/80 border border-light/30 dark:border-gray-700/50 shadow-xl rounded-2xl p-6 sticky top-24 backdrop-blur-md transition-all duration-300">
              <h3 className="text-xs font-bold text-gray-400 dark:text-lighter/40 uppercase tracking-widest mb-6 pb-4 border-b border-gray-100 dark:border-gray-700/50">
                Order Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[14px] font-medium text-gray-500 dark:text-gray-400">
                  <span>Items Selected</span>
                  <span className="font-bold text-gray-800 dark:text-lighter">{cart.length}</span>
                </div>
                
                <div className="flex justify-between items-center text-[14px] font-medium text-gray-500 dark:text-gray-400">
                  <span>Estimated Shipping</span>
                  <span className="text-primary dark:text-light font-bold uppercase tracking-wider text-[11px] bg-primary/5 dark:bg-light/5 px-2.5 py-1 rounded-lg">Free</span>
                </div>
                
                <div className="pt-5 mt-2 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-baseline mb-8">
                  <span className="text-[15px] font-bold text-gray-800 dark:text-lighter">Total Subtotal</span>
                  <span className="text-2xl font-extrabold text-primary dark:text-light tracking-tight">${subtotal}</span>
                </div>

                <Link 
                  to="/checkout" 
                  className="w-full py-4 px-6 bg-primary dark:bg-light text-white dark:text-darkbg text-[15px] font-bold rounded-xl flex justify-center items-center hover:bg-opacity-95 shadow-md active:scale-[0.995] transition-all duration-200 tracking-wide"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>

          </div>
        ) : (
          /* Minimalist Luxury Empty State Card */
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 border border-light/30 dark:border-gray-700/50 shadow-2xl rounded-2xl px-8 py-12 text-center flex flex-col items-center transition-all duration-300">
            <div className="mb-6 p-4 bg-lighter/5 dark:bg-darkbg/20 rounded-full">
              <img
                src={emptyCartImage}
                alt="Empty Cart"
                className="max-w-[140px] mx-auto mix-blend-multiply dark:mix-blend-normal dark:opacity-90"
              />
            </div>
            <h3 className="text-[17px] font-bold text-gray-800 dark:text-lighter mb-1.5">
              Your cart is empty
            </h3>
            <p className="text-sm font-medium text-gray-400 dark:text-gray-500 max-w-[260px] mb-8 leading-relaxed">
              Explore our dynamic collection to fill it up.
            </p>
            <Link
              to="/home"
              className="w-full py-3.5 px-6 bg-primary dark:bg-light text-white dark:text-darkbg text-[15px] font-bold rounded-xl flex justify-center items-center hover:bg-opacity-95 shadow-md transition-all duration-200 active:scale-[0.995]"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;