import z from "zod";

export const signupInput = z.object({
    name : z.string(),
    email : z.string(),
    password : z.string().min(8)
});

export const signinInput = z.object({
    email : z.string(),
    password : z.string().min(8)
})