const PageHeading = ({ title, children }) => {
  return (
    <div className="text-center mb-12">

      <h1 className="text-4xl font-bold text-primary mb-4 dark:text-light">
        {title}
      </h1>

      <p className="text-lg text-gray-600 dark:text-lighter max-w-2xl mx-auto">
        {children}
      </p>

    </div>
  )
}

export default PageHeading