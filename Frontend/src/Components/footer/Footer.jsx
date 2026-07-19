import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer className="flex justify-center items-center py-6 font-primary text-gray-500 dark:text-lighter/60 border-t border-light/40 dark:border-border-dark bg-cardbg-light/50 dark:bg-darkbg/50 backdrop-blur-md mt-12 transition-all duration-300">
      <p className="flex items-center text-sm sm:text-base tracking-wide font-medium">
        Crafted with
        <FontAwesomeIcon
          icon={faHeart}
          className="text-rose-500 mx-2 animate-pulse text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
          aria-hidden="true"
        />
        by
        <span className="ml-1 font-extrabold bg-gradient-to-r from-primary to-primary-hover dark:from-light dark:to-lighter bg-clip-text text-transparent transition-all duration-300 hover:scale-102 cursor-pointer select-none">
          Stickora
        </span>
      </p>
    </footer>
  )
}

export default Footer;