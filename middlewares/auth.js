const jwt = require("jsonwebtoken");

const auth = {
  verifyUser: (req, res, next) => {
    const userId = req.body.user;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "No user provided",
      });
    }
    next();
  },
  verifyResult: (req, res, next) => {
    const { token } = req.headers;
    console.log("token recibido", token);

    jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyResult.email) {
      return res.json({
        success: false,
        message: "Wrong email",
      });
    }
    next();
  },
  completeUserInfo: (req, res, next) => {
    if (req.body.user) {
      req.body.user = `El ID del usuario es ${req.body.user}`;
    }
    next();
  },
};

module.exports = auth;
