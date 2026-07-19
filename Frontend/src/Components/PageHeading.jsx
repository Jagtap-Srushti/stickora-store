import React from 'react'

const PageHeading = ({ title, children }) => {
  return (
    <div className="text-center pt-6 pb-4 mb-8 font-primary max-w-2xl mx-auto px-4 animate-ui-pop">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 dark:text-light tracking-tight leading-none transition-colors duration-300">
        {title}
      </h1>
      
      {children && (
        <p className="text-base sm:text-lg text-gray-600 dark:text-lighter/80 leading-relaxed font-medium transition-colors duration-300">
          {children}
        </p>
      )}
    </div>
  )
}

export default PageHeading;