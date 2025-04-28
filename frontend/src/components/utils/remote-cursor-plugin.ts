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
            console.log(old,oldState)
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
