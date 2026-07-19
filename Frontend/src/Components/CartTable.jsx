import React from "react";
import { useCart } from "../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CartTable = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const updateCartQuantity = (productId, quantity) => {
    const product = cart.find((item) => item.productId === productId);
    addToCart(product, quantity - (product?.quantity || 0));
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Enforce a completely fixed table column grid layout */}
      <table className="w-full border-collapse min-w-[550px] table-fixed">
        <thead>
          <tr className="text-xs font-bold tracking-widest text-gray-400 dark:text-lighter/30 uppercase border-b border-gray-100 dark:border-gray-700/50">
            <th className="w-[50%] px-4 py-4 text-left font-bold">Product Details</th>
            <th className="w-[20%] px-4 py-4 text-center font-bold">Quantity</th>
            <th className="w-[20%] px-4 py-4 text-center font-bold">Total Price</th>
            <th className="w-[10%] px-4 py-4 text-center font-bold"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/40">
          {cart.map((item) => (
            <tr
              key={item.productId}
              className="text-gray-700 dark:text-lighter group hover:bg-lighter/5 dark:hover:bg-darkbg/10 transition-colors duration-150"
            >
              {/* Product Info Block */}
              <td className="w-[50%] px-4 py-5 text-left align-middle">
                <Link
                  to={`/products/${item.productId}`}
                  state={{ product: item }}
                  className="flex items-center space-x-4 max-w-full group inline-flex"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-700/80 flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-[1.03]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-[15px] group-hover:text-primary dark:group-hover:text-light transition-colors duration-150 truncate max-w-[180px] sm:max-w-xs">
                    {item.name}
                  </span>
                </Link>
              </td>

              {/* Sophisticated Numeric Input (Hiding browser spin buttons) */}
              <td className="w-[20%] px-4 py-5 text-center align-middle">
                <div className="flex justify-center items-center">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateCartQuantity(
                        item.productId,
                        parseInt(e.target.value, 10) || 1
                      )
                    }
                    /* Added style rules to natively hide spin-buttons for a clean look */
                    className="w-14 h-9 px-2 text-center text-[14px] font-bold border rounded-xl 
                               focus:outline-none focus:border-primary dark:focus:border-light 
                               focus:ring-4 focus:ring-primary/5 dark:focus:ring-light/5 
                               bg-lighter/5 dark:bg-darkbg/10 border-light/70 dark:border-gray-700 
                               text-gray-900 dark:text-lighter transition-all duration-200
                               [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </td>

              {/* Absolute Centered Total Price */}
              <td className="w-[20%] px-4 py-5 text-center align-middle font-bold text-[15px] tracking-tight text-gray-800 dark:text-lighter">
                ${(item.price * item.quantity).toFixed(2)}
              </td>

              {/* Action Clear Row Button */}
              <td className="w-[10%] px-4 py-5 text-center align-middle">
                <button
                  aria-label="delete-item"
                  onClick={() => removeFromCart(item.productId)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:border-red-100 dark:hover:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xs" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;