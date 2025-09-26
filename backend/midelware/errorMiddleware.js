import ErrorHandler from "../utils/ErrorHandler.js";

const errorMiddleware = (err, req, res, next) => {
  // معالجة CastError
  if (err.name === "CastError") {
    const message = `Invalid resource: ${err.path}`;
    err = new ErrorHandler(404, message);
  }

  
  if (err.code === 11000) {
    let field = "field";
    let value = "value";

    if (err.keyValue) {
      field = Object.keys(err.keyValue)[0];
      value = err.keyValue[field];
    } else if (err.message) {
    
      const match = err.message.match(/index: (.+?) dup key: { :?"?(.+?)"? }/);
      if (match) {
        field = match[1];
        value = match[2];
      }
    }

    const message = `The ${field} "${value}" is already registered. Please login to continue.`;
    err = new ErrorHandler(409, message);
  }

 
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
