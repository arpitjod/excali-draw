import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import {JWT_TOKEN} from "@repo/backend-common/config"
export function  middleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers["authorization"]??""
    const decode=jwt.verify(token,JWT_TOKEN);
    if(decode){
        //@ts-ignore;todo
        req.userID=decode.userId;
        next();
    }
    else{
        res.status(403).json({
            status:"unauthorized"
        })
    }
}