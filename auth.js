const bcrypt = require("bcrypt");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");
// register
const register = async (email, password, done) => {
  const saltRounds = 10;

  try {
    if (!email) {
      throw new Error("A email was not provided");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.build({ email, passwordHash: hash });

    try {
      await user.save();
      done(null, user);
    } catch (error) {
      done(null, {});
    }
  } catch (error) {
    done(error);
  }
};
// verify
const verify = async (token, done) => {
  console.log(`inside authenticate.verify`);
  try {
    done(null, token.user);
  } catch (error) {
    done(error);
  }
};

const login = async (email, password, done) => {
  try {
   const user = await User.findOne({ where: { email: email } });

    //const user = await User.findOne({or: [{email: email}, {username: email}]});
console.log(user);
    if (!user) {
      return done(null, false, { msg: "Incorrect Email" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    return match ? done(null, user) : done(null, false, { msg: "Incorrect Password" });
console.log(match);
  } catch (error) {
    done(error);
  }
};

const verifyStrategy = new JWTStrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
  },verify);

const registerStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  register
);

const loginStrategy = new LocalStrategy(login);

module.exports = {
  registerStrategy,
  verifyStrategy,
  loginStrategy,
};
