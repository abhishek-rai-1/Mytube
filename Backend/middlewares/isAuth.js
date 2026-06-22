import jwt from "jsonwebtoken"

const isAuth = (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token)  return res.status(400).json({message : "token is not present"});

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifiedToken)  return res.status(400).json({message : "User don't have valid token"});

        req.userId = verifiedToken.userId;
        next();
    } catch (error) {
        return res.status(500).json({message : `isAuth error : ${error.message}`})
    }
}

export default isAuth;