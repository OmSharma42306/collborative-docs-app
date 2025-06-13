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
        const length = Number(op.length);
        
        // remove the text with from positon to  given length.
        // pos-->length; (0 , 6)-

        return docsName.slice(0,position) + docsName.slice(position+length)
      
    }
    return docsName;
    
}

// writing transformOperation Function.

export function transformOperation(baseOp:Operation,incomingOp:Operation):Operation | null{
    if(baseOp.type === 'insert' && incomingOp.type === 'insert'){

        if(baseOp.index < incomingOp.index){
            incomingOp.index++;
        }else if(baseOp.index>incomingOp.index){
            console.log("Do Nothing!");
        }else if(baseOp.index === incomingOp.index){
            // tie
        }
    
        return incomingOp;
    
        
    }else if(baseOp.type === 'insert' && incomingOp.type === 'delete'){
        if(baseOp.index<=incomingOp.index){
            incomingOp.index++;
        }
        return incomingOp; 
    }else if(baseOp.type === 'delete' && incomingOp.type === 'insert'){
        if(baseOp.index<incomingOp.index){
            incomingOp.index--;
        }
        return incomingOp; 
    }else if(baseOp.type === 'delete' && incomingOp.type === 'delete'){
        
           if(incomingOp.index >= Number(baseOp.index + Number(baseOp.length))){
            incomingOp.index = incomingOp.index - Number(baseOp.length);
        
        }else if(incomingOp.index < baseOp.index + Number(baseOp.length)){ // it falls partially inside baseOp’s deleted range.
                let overlap = baseOp.index + Number(baseOp.length) - incomingOp.index;
                let finalLength= Number(incomingOp.length)-overlap;
                if(finalLength <= 0){
                    // already deleted before incomingOp's Delete Operation so just avoid.
                    return null;
                }
                incomingOp.length = finalLength.toString();
            
        }
        
        


        return incomingOp; 
    }
    return incomingOp;
}

// writing get Missed Operation. 
// When a client reconnects or sends an operation, you’ll fetch all operations that happened after the client’s known version.

export function getMissedOperations(){

}