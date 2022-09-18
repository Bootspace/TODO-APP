require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateJWT = async (user) => {
  let token = await jwt.sign(
      {
          _id: user.id,
          email: user.email
      },
      process.env.SECRET,
      { expiresIn: '7d' }
  );
  return token;
};
