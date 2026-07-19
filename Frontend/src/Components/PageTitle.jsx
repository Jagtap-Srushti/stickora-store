import React from 'react'

const PageTitle = ({ title }) => {
  return (

    <div className="flex flex-col items-center font-primary pt-4 pb-2 text-center animate-ui-pop">

      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary dark:text-light transition-colors duration-300">
        {title}
      </h2>
      

      <div className="w-10 h-1 bg-light dark:bg-primary-hover/50 mt-2 rounded-full transition-all duration-300 group-hover:w-16" />
      
    </div>
  )
}

export default PageTitle;