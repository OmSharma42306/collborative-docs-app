// // adding customs prosemirror plugin
// import {Decoration,DecorationSet} from "prosemirror-view";
// import { Plugin } from "prosemirror-state";

// // adding customs prosemirror plugin

// export function RemoteCursorPlugin(remoteCursors:any){
//     return new Plugin({
//       props:{
//         decorations(state){
//           const decorations :any = [];
    
//           Object.values(remoteCursors).forEach(({from,to,color,username}:any)=>{
//             decorations.push(
//               Decoration.inline(from,to,{
//                 style: `background-color: ${color}55`,
//                 title:username,
//               })
//             )
//           })
    
//           return DecorationSet.create(state.doc,decorations);
//         }
//       }
//     })
// }
    
// import { Plugin, PluginKey } from "prosemirror-state";
// import { Decoration, DecorationSet } from "prosemirror-view";

// export function RemoteCursorPlugin(cursors: Record<string, { from: number, to: number, color: string, name: string }>) {
//   return new Plugin({
//     key: new PluginKey("remoteCursorPlugin"),
//     state: {
//       init: () => DecorationSet.empty,
//       apply: (tr, old) => {
//         return old;
//       },
//     },
//     props: {
//       decorations() {
//         const decorations: Decoration[] = [];

//         for (const userId in cursors) {
//           const cursor = cursors[userId];
//           decorations.push(
//             Decoration.inline(cursor.from, cursor.to, {
//               style: `background-color: ${cursor.color}; opacity: 0.5;`
//             })
//           );
//           decorations.push(
//             Decoration.widget(cursor.to, () => {
//               const label = document.createElement("span");
//               label.style.color = cursor.color;
//               label.style.fontSize = "0.8rem";
//               label.innerText = cursor.name;
//               return label;
//             })
//           );
//         }
//         //@ts-ignore
//         return DecorationSet.create(this.doc, decorations);
//       }
//     }
//   });
// }





// import { Extension } from '@tiptap/core'
// import { Plugin, PluginKey } from 'prosemirror-state'
// import { Decoration, DecorationSet } from 'prosemirror-view'

// export const RemoteCursorExtension = Extension.create({
//   name: 'remoteCursor',

//   addOptions() {
//     return {
//       cursors: {},
//     }
//   },

//   addProseMirrorPlugins() {
//     return [
//       new Plugin({
//         key: new PluginKey('remoteCursorPlugin'),
//         state: {
//           init: () => DecorationSet.empty,
//           apply: (tr, old) => old,
//         },
//         props: {
//           decorations: ({ doc }) => {
//             const decorations: Decoration[] = []
//             const cursors = this.options.cursors

//             for (const userId in cursors) {
//               const cursor = cursors[userId]
//               decorations.push(
//                 Decoration.inline(cursor.from, cursor.to, {
//                   style: `background-color: ${cursor.color}; opacity: 0.5;`,
//                 }),
//               )
//               decorations.push(
//                 Decoration.widget(cursor.to, () => {
//                   const label = document.createElement('span')
//                   label.style.color = cursor.color
//                   label.style.fontSize = '0.8rem'
//                   label.innerText = cursor.name
//                   return label
//                 }),
//               )
//             }

//             return DecorationSet.create(doc, decorations)
//           },
//         },
//       }),
//     ]
//   },
// })



import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const RemoteCursorExtension = Extension.create({
  name: 'remoteCursor',

  addOptions() {
    return {
      cursors: {},
    }
  },

  addProseMirrorPlugins() {
    const pluginKey = new PluginKey('remoteCursorPlugin')

    return [
      new Plugin({
        key: pluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply: (tr, old, oldState, newState) => {
            //const cursors = tr.getMeta(pluginKey)?.cursors ?? this.options.cursors
            const cursors = tr.getMeta('remoteCursorPlugin')?.cursors ?? this.options.cursors

            const decorations: Decoration[] = []

            for (const userId in cursors) {
              const cursor = cursors[userId]
              decorations.push(
                Decoration.inline(cursor.from, cursor.to, {
                  style: `background-color: ${cursor.color}; opacity: 0.5;`,
                }),
              )
              decorations.push(
                Decoration.widget(cursor.to, () => {
                  const label = document.createElement('span')
                  label.style.color = cursor.color
                  label.style.fontSize = '0.8rem'
                  label.innerText = cursor.name
                  return label
                }),
              )
            }

            return DecorationSet.create(newState.doc, decorations)
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})
