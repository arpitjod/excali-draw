import {z} from "zod";

export const UserSignupSchema=z.object({
    email:z.string().min(3).max(10),
    password:z.string().min(4).max(10),
    name:z.string(),
    photo:z.string(),
})
export const SignInSchema=z.object({
    email:z.string().min(3).max(10),
    password:z.string().min(4).max(10),
})
export const RoomNameSchema=z.object({
    RoomName:z.string()
})