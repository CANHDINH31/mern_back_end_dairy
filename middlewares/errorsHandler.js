exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (err.code === 11000) {
    err.statusCode = 400;
    for (let p in err.keyValue) {
      if (p === "name") {
        err.message =
          "username already exist !!! please choose another username";
      } else {
        err.message = `${p} already exist !!! please choose another ${p}`;
      }
    }
  }
  if (err.kind === "ObjectId") {
    err.statusCode = 404;
    err.message = `The ${req.originalUrl} is not found because of wrong ID`;
  }

  //validate
  if (err.errors) {
    err.statusCode = 400;
    err.message = [];
    // err.message = err.errors.content.properties.message;
    for (let p in err.errors) {
      err.message.push(err.errors[p].properties.message);
    }
  }

  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
};
