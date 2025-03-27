// // src/Tiptap.tsx
// import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// // define your extension array
// const extensions = [StarterKit]

// const content = '<p>Hello World!</p>'

// const Tiptap = () => {
//   return (
//     <EditorProvider extensions={extensions} content={content}>
//       <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
//       <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
//     </EditorProvider>
//   )
// }

// export default Tiptap



import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import "../styles/Editor.css"; // Add basic styles

const TextEditor: React.FC = () => {
  const [content,setContent] = useState("");
  const editor = useEditor({
    extensions: [StarterKit], // Basic formatting (bold, italic, lists, etc.)
    content: "<p>Start writing...</p>", // Initial content
    onUpdate: ({editor}) => {
        // get content in JSON format.
        const content = editor.getJSON();
        console.log(content)
        let extractedContent:string|any = "";
        content.content?.map(co=>{
            co.content?.map(c=>{
                 extractedContent+=c.text;
            })
            
        })
        console.log(extractedContent)
    }
  });

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
