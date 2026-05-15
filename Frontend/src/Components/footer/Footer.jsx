import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer className='flex justify-center items-center py-4 font-primary text-gray-700 border-t mt-10'>

      <p className='flex items-center text-sm sm:text-base'>

        Crafted with

        <FontAwesomeIcon
          icon={faHeart}
          className='text-red-500 mx-2 animate-pulse'
          aria-hidden="true"
        />

        by

        <span className='text-primary font-semibold ml-2'>
          Stickora
        </span>

      </p>

    </footer>
  )
}

export default Footer