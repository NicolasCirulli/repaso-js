import { createNote, render, createArticleNote } from "./funciones.js"
const $form = document.getElementById("form-create-note")
const $sectionNotes = document.getElementById("section-notes")
const $filter = document.getElementById("filter")
const $search = document.getElementById("search")
const $filterPending = document.getElementById("filter-pending")
const notes = JSON.parse( localStorage.getItem( "notes" ) ) || []
let id = notes[ notes.length - 1 ]?.id || 0

render( notes, $sectionNotes,createArticleNote)

$form.addEventListener( 'submit', ( e ) => {
    e.preventDefault()
    const title = e.target[0].value 
    const description = e.target[1].value 
    const newNote = createNote( {title, description, id:++id} )
    notes.push( newNote )
    localStorage.setItem( "notes", JSON.stringify( notes ) )
    render( notes, $sectionNotes,createArticleNote)
} )


$sectionNotes.addEventListener( 'click', e => {
    const dataset =e.target.dataset 
    if( dataset.changestate ){
        let note = notes.find( note => note.id === Number(dataset.changestate) )
        note.state = !note.state
        localStorage.setItem( "notes", JSON.stringify( notes ) )
        render( notes, $sectionNotes,createArticleNote)
    }

    if( dataset.delete ){
        let noteIndex = notes.findIndex( note => note.id === Number(dataset.delete) )
        notes.splice( noteIndex, 1 )
        localStorage.setItem( "notes", JSON.stringify( notes ) )
        e.target.parentNode.remove()
    }
} )

$filter.addEventListener( "input", e => {
    const filtered = notes.filter( note => note.title.toLowerCase().includes( $search.value.toLowerCase() ) && ( !$filterPending.checked || $filterPending.checked != note.state ) ) 
    render( filtered, $sectionNotes,createArticleNote)
    
} )
