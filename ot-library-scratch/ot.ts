// writing operational transformers from scratch.


type Operation = {
    id : 'string';
    type : 'insert' | 'delete';
    index : number;
    text? : string; // for insert text.
    length? :string; // for delete text.
    version : number;
    userId : string;
}


// writing applyOperation Function.

export function applyOperation(docsName:string,op:Operation):string{
    
    if(op.type === 'insert'){
        // get the Positon.
        // get the text.
        // apply the text to document.
        const position = op.index;
        const text = op.text;
        // add this text to document.
        return docsName.slice(0,position)+text+docsName.slice(position);
    }else if(op.type === 'delete'){
        // get the Position.
        // get the text.
        // apply the changes.
        const position = op.index;
        const length = op.length;
        
        // remove the text with from positon to  given length.
        // pos-->length; (0 , 6)
      
    }
    return docsName;
    
}

// writing transformOperation Function.

export function transformOperation(op:Operation){
    
}

// writing get Missed Operation. 
// When a client reconnects or sends an operation, you’ll fetch all operations that happened after the client’s known version.

export function getMissedOperations(){

}