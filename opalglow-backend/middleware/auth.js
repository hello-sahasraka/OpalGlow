import jwt from "jsonwebtoken";

export default function verifyJWt (req, res, next){
    const header = req.header("Authorization");
    if(header != null){
        const token = header.replace("Bearer ", "");
        jwt.verify(token, "infuse123", (err, decoded)=> {
            if(decoded != null){
                console.log(decoded);
                req.user = decoded;
            }
        })
    }
    next();
}