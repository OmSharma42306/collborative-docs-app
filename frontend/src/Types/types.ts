export interface signUpType{
    name : string;
    email : string;
    password : string;
}

export interface signInType{
    email : string;
    password : string;
}

export interface createDocumentType{
    documentName:string;
}

export interface deleteDocumentType{
    documentName:string;
}
