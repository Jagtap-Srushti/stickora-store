const PageHeading = ({ title, children }) => {
  return (
    <div className="text-center mb-12">

      <h1 className="text-4xl font-bold text-primary mb-4">
        {title}
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {children}
      </p>

    </div>
  )
}

export default PageHeading