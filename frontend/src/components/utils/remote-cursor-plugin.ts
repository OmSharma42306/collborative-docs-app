// adding customs prosemirror plugin
import {Decoration,DecorationSet} from "prosemirror-view";
import { Plugin } from "prosemirror-state";

// adding customs prosemirror plugin

export function RemoteCursorPlugin(remoteCursors:any){
    return new Plugin({
      props:{
        decorations(state){
          const decorations :any = [];
    
          Object.values(remoteCursors).forEach(({from,to,color,username}:any)=>{
            decorations.push(
              Decoration.inline(from,to,{
                style: `background-color: ${color}55`,
                title:username,
              })
            )
          })
    
          return DecorationSet.create(state.doc,decorations);
        }
      }
    })
}
    