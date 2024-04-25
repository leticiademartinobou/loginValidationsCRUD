// Generar el jwt

const token = {
  generateToken: async (email) => {
    const token = jwt.sign(
      {
        email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1m" }
    );
  },
};

module.exports = token;
