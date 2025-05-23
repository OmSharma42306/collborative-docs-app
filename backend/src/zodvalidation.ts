import z from "zod";

export const signupInput = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(8)
});

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

export const createDocument = z.object({
    documentName : z.string(),
    content:z.string().optional()
});

export const deleteDocument = z.object({
    documentName : z.string()
})

