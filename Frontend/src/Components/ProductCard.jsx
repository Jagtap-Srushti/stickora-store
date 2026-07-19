import React from 'react'
import Price from './Price'
import { useNavigate } from 'react-router-dom' // 👈 Swapped Link for useNavigate
import { useCart } from '../store/cart-context'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate(); // 👈 Initialized navigation hook

  const handleCardClick = () => {
    // Navigates to the details route and passes down the product state perfectly
    navigate(`/products/${product.productId}`, { state: { product } });
  };

  return (
    <div 
      onClick={handleCardClick} // 👈 Entire card is now cleanly clickable
      className="group w-72 rounded-2xl mx-auto border border-light/40 dark:border-border-dark shadow-premium hover:shadow-premium-hover bg-cardbg-light dark:bg-cardbg-dark transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 cursor-pointer"
    >

      {/* Product Image Wrap */}
      <div className="relative w-full h-72 overflow-hidden bg-lighter/20 dark:bg-darkbg/40 border-b border-light/30 dark:border-border-dark/50 flex items-center justify-center p-4">
        {/* Rounded Inner Container to beautifully wrap the graphic's square background */}
        <div className="w-full h-full rounded-xl overflow-hidden shadow-sm transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Premium Ambient Micro-Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 font-primary">
        <h2 className="text-base font-bold text-gray-800 dark:text-lighter tracking-tight transition-colors duration-200 group-hover:text-primary dark:group-hover:text-light line-clamp-1 mb-1.5">
          {product.name}
        </h2>

        <p className="text-xs font-medium text-gray-400 dark:text-lighter/50 line-clamp-2 leading-relaxed mb-5">
          {product.description}
        </p>

        {/* Dynamic Card Footer Action Row */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="text-base font-black tracking-tight text-dark dark:text-white">
            <Price currency="$" price={product.price} />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // 👈 Essential: prevents card navigation from firing when clicking add to cart
              addToCart(product, 1);
            }}
            className="group/btn flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wide text-white bg-primary hover:bg-primary-hover active:scale-95 rounded-xl transition-all duration-300 cursor-pointer shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="w-3 h-3 transition-transform duration-300 group-hover/btn:rotate-90"
            />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;