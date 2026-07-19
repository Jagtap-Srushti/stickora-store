import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faShoppingCart,
    faShoppingBasket,
    faPlus,
    faMinus,
    faCheckCircle,
    faShieldHalved,
    faTruckFast
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../store/cart-context";

export default function ProductDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart } = useCart();

    const product = location.state?.product;

    const [quantity, setQuantity] = useState(1);
    const [isHovering, setIsHovering] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState("center");
    const [isMounted, setIsMounted] = useState(false);
    const zoomRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-primary bg-normalbg dark:bg-darkbg text-center px-6 transition-all duration-500">
                <div className="p-8 bg-cardbg-light dark:bg-cardbg-dark rounded-[1.5rem] shadow-premium border border-light/30 dark:border-border-dark max-w-sm animate-ui-pop">
                    <h2 className="text-xl font-bold text-dark dark:text-white mb-2">Product Not Found</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Please navigate to this product from our storefront collection catalog.</p>
                    <Link to="/home" className="inline-flex items-center justify-center w-full px-5 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all active:scale-95 shadow-md text-sm">
                        Return to Store
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (quantity < 1) return;
        addToCart(product, quantity);
    };

    const handleMouseMove = (e) => {
        if (!zoomRef.current) return;
        const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
    };

    return (
        <div className="relative min-h-screen bg-normalbg dark:bg-darkbg py-12 px-4 sm:px-6 lg:px-8 font-primary antialiased transition-colors duration-500 overflow-hidden">
            
            {/* Ambient Lighting Background Fields */}
            <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute bottom-0 left-0 w-[300px] h-[300px] bg-light/10 dark:bg-primary/5 rounded-full blur-[80px] pointer-events-none transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`} />

            {/* Compact UI wrapper */}
            <div className="max-w-5xl mx-auto relative z-10">
                
                {/* Back to Collection Link */}
                <div className={`transition-all duration-500 transform ${isMounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                    <Link
                        to="/home"
                        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-light transition-all mb-6 group"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-2xs transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to Collection
                    </Link>
                </div>

                {/* Main Product Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center">
                    
                    {/* LEFT BLOCK: Image Container Showcase */}
                    <div className="w-full max-w-md mx-auto group/stage">
                        <div className="relative rounded-[1.5rem] p-4 bg-cardbg-light/40 dark:bg-cardbg-dark/40 border border-light/40 dark:border-border-dark/60 shadow-premium backdrop-blur-md transition-all duration-500 group-hover/stage:shadow-premium-hover">
                            
                            {/* Floating Original Artwork Tag */}
                            <div className="absolute top-4 left-4 z-20">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-white/95 dark:bg-darkbg/95 text-primary dark:text-light border border-light/30 shadow-sm backdrop-blur-sm">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500" /> Original Artwork
                                </span>
                            </div>

                            {/* Main Display Window */}
                            <div className="relative overflow-hidden rounded-xl bg-lighter/20 dark:bg-darkbg/40 aspect-square flex items-center justify-center border border-light/20 dark:border-border-dark/40 shadow-sm">
                                <div
                                    ref={zoomRef}
                                    onMouseMove={isHovering ? handleMouseMove : null}
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => {
                                        setIsHovering(false);
                                        setBackgroundPosition("center");
                                    }}
                                    className="w-full h-full bg-cover cursor-zoom-in transition-transform duration-500 rounded-xl overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${product.imageUrl})`,
                                        backgroundSize: isHovering ? "220%" : "cover",
                                        backgroundPosition: backgroundPosition,
                                    }}
                                >
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full opacity-0 pointer-events-none"
                                    />
                                </div>
                            </div>

                            <p className="text-center text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mt-3.5">
                                Move lens over canvas to zoom
                            </p>
                        </div>
                    </div>

                    {/* RIGHT BLOCK: Balanced Proportional Details Column */}
                    <div className="w-full flex flex-col justify-center space-y-6 animate-ui-pop">
                        
                        {/* Title and Pricing - FIXED: Normal proportional sizing scale */}
                        <div className="space-y-2">
                            <h1 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white tracking-tight">
                                {product.name}
                            </h1>
                            
                            <div className="flex items-center gap-3.5 pt-0.5">
                                <span className="text-2xl sm:text-3xl font-medium text-primary dark:text-light tracking-tight">
                                    ${product.price}
                                </span>
                                <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-400/5 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg shadow-sm">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                        Ready to Ship
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description - FIXED: Standard readable text sizing */}
                        <div className="border-t border-b border-light/40 dark:border-border-dark/60 py-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                                {product.description}
                            </p>
                        </div>

                        {/* Interactive Selection Widget Container */}
                        <div className="p-5 bg-cardbg-light dark:bg-cardbg-dark rounded-xl border border-light/40 dark:border-border-dark shadow-sm flex flex-col gap-5">
                            
                            {/* Quantity Counter Row */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-0.5">Quantity</span>
                                    <span className="text-[11px] text-dark/60 dark:text-lighter/40 font-medium">Batch limit adjusted</span>
                                </div>

                                <div className="flex items-center border border-light dark:border-border-dark rounded-xl bg-normalbg dark:bg-darkbg overflow-hidden p-0.5 shadow-inner">
                                    <button 
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-light hover:bg-cardbg-light dark:hover:bg-cardbg-dark transition-all active:scale-90"
                                    >
                                        <FontAwesomeIcon icon={faMinus} className="text-xs" />
                                    </button>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={quantity}
                                        readOnly
                                        className="w-8 text-center font-bold text-xs text-dark dark:text-white bg-transparent pointer-events-none focus:outline-none"
                                    />
                                    <button 
                                        onClick={() => setQuantity(q => Math.min(10, q + 1))}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-light hover:bg-cardbg-light dark:hover:bg-cardbg-dark transition-all active:scale-90"
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="text-xs" />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons Deck */}
                            <div className="flex flex-col sm:flex-row gap-2.5">
                                <button
                                    onClick={handleAddToCart}
                                    className="relative overflow-hidden flex-[2] px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold tracking-wide shadow-sm transition-all duration-300 active:scale-98 cursor-pointer group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-[1500ms] transition-transform ease-in-out" />
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <span>Add to Cart</span>
                                        <FontAwesomeIcon icon={faShoppingCart} className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </span>
                                </button>

                                <button
                                    onClick={() => navigate("/cart")}
                                    className="flex-[1] px-4 py-3 bg-lighter hover:bg-light dark:bg-darkbg dark:hover:bg-border-dark/60 text-dark dark:text-light rounded-xl text-xs font-bold tracking-wide transition-all duration-300 active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer border border-light dark:border-border-dark"
                                >
                                    <span>Basket</span>
                                    <FontAwesomeIcon icon={faShoppingBasket} className="text-xs" />
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-start gap-2.5 p-3 bg-lighter/20 dark:bg-cardbg-dark/20 rounded-xl border border-light/10 dark:border-border-dark/30 shadow-2xs">
                                <div className="p-1.5 bg-white dark:bg-darkbg rounded-lg shadow-2xs border border-light/20">
                                    <FontAwesomeIcon icon={faTruckFast} className="text-primary dark:text-light text-2xs" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-dark dark:text-white block uppercase tracking-wider mb-0.5">Free Courier</span>
                                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">Insured logistics</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5 p-3 bg-lighter/20 dark:bg-cardbg-dark/20 rounded-xl border border-light/10 dark:border-border-dark/30 shadow-2xs">
                                <div className="p-1.5 bg-white dark:bg-darkbg rounded-lg shadow-2xs border border-light/20">
                                    <FontAwesomeIcon icon={faShieldHalved} className="text-primary dark:text-light text-2xs" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-dark dark:text-white block uppercase tracking-wider mb-0.5">Secure Escrow</span>
                                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">Encrypted gateway</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}