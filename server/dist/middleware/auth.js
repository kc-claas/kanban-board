import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || '';
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(401);
            }
            else {
                req.user = user;
                return next();
            }
        });
    }
    else {
        res.sendStatus(401);
    }
};
