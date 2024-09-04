export function createNote( {title, description, state=false, id} ){
    return {
        id,
        title, 
        description,
        state
    }
}

export function render( list, container, fn ){
    const fragment = document.createDocumentFragment()
    for (const item of list) {
        fragment.appendChild( fn( item ) )
    }
    container.innerHTML = ""
    container.appendChild( fragment )
}

export function createArticleNote( {id, state, title, description} ){
    const article = document.createElement( "article" )
    article.className = "flex flex-col bg-zinc-800 gap-2 border rounded w-2/4 min-w-[320px] w-max-[500px] p-5 relative"
    
    const h3 = document.createElement( "h3" )
    h3.className = "text-2xl"
    h3.textContent = title

    const p = document.createElement( "p" )
    p.className = "text-lg"
    p.textContent = description

    const btn = document.createElement( "button" )
    btn.setAttribute( "data-delete", id )
    btn.className = "bg-white p-1 rounded absolute top-2 right-2"
    btn.textContent = "❌"

    const label = document.createElement( "label" )
    label.setAttribute( "data-changeState", id )
    label.className = `select-none cursor-pointer bg-white px-4 py-1 text-xl rounded self-center text-${state ? 'emerald' : 'red' }-700`
    label.setAttribute( "for", `${id}-state` )
    label.textContent = state ? "Done" : "Pending"

    const input = document.createElement( "input" )
    input.setAttribute( "type", "checkbox" )
    input.setAttribute( "name", "note-status" )
    input.setAttribute( "id", `${id}-state` )
    input.className = "hidden"

    article.append(  h3,p,btn,label,input )
    return article
}   
