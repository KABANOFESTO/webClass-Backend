import passportJwt from 'passport-jwt';
import passport from 'passport';
import User from '../models/userModel.js';

const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'my-token-secret'
};

passport.use(new JWTstrategy(opts, async (jwt_payload, done) => {
    try {
        // Destructure user id from jwt_payload
        const userId = jwt_payload.id;

        // Use await to handle the promise
        const user = await User.findOne({ _id: userId }).exec();

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // Optionally, you could create a new account here if needed
        }
    } catch (err) {
        return done(err, false);
    }
}));
