const content = {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "Start wrigwegeting..."
                }
            ]
        }
    ]
}

console.log(content.content.map(e=>{
    // e.content.map(e=>{e.text})
    e.content.map(el=>{
        console.log(el.text)
    })
}))