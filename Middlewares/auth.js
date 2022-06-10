const createError = require("../routes/api/error");
const { authenticateUser } = require("../Services/auth.service");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(createError(401, "Not authorized"));
  }
  const user = await authenticateUser(token);
  if (!user || user.token !== token) {
    next(createError(401, "Not authorized"));
  }

  req.user = user;

  next();
};

const authorizeUser = (subscription) => {
  return (req, res, next) => {
    if (req.user.subscription !== subscription) {
      next({ staus: 403, message: "forbidden" });
    }
    next();
  };
};

module.exports = { auth, authorizeUser };
