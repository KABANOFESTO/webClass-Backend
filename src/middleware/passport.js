import passportJwt from 'passport-jwt'
const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
import passport from 'passport';
import User from '../models/userModel.js';
var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'my-token-secret';

passport.use(new JWTstrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload)
    User.findOne({ _id: jwt_payload.id._id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));