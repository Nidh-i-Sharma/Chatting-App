const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    // Handle specific types of errors
    if (err.name === 'ValidationError') {
      // Handle validation errors
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ error: errors });
    }
  
    // Handle other types of errors
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
export default errorHandler;
  