// User Crud Stuff
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

export interface allDocumentsType{
    _id : string;
    userId : string;
    documentName : string;
    content : string;
    createdAt : string;
    __v: number;
}


// Editor Related Stuff
export interface SocketData {
  msg: string;
  data: CursorData;
  type: string;
}

export interface CursorData {
  userId: string;
  name: string;
  from: number;
  to: number;
  color: string;
}

export interface CursorPostions {
  from: number;
  to: number;
}
