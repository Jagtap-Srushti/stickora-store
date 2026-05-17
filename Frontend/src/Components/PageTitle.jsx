import React from 'react'

const PageTitle = (props) => {
  return (
    <div className="text-3xl font-primary font-extrabold text-center text-primary dark:text-light mt-4 py-2">
      {props.title}
    </div>
  )
}

export default PageTitle
