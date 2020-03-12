const errorHandler = (err, req, res, next) => {
  let status = 500
  if (err.name === 'NOT_FOUND') {
    res.status(err.status).json({
      status: err.status,
      message: err.message
    })
  } else {
    res.status(status).json({
      status,
      message: 'Internal server error'
    })
  }
}

export default errorHandler