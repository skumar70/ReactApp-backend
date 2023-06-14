const Note = require("../models/note");

const fetchNotes = async (req, res) => {
    //Find the notes
    const notes = await Note.find()
    //Respond with them
    res.json({ notes })
};

const fetchNote = async (req, res) =>{
    //Get Id of URL
    const noteID = req.params.id;

    //Find note using id
    const note = await Note.findById(noteID);

    //Respond with the note
    res.json({ note })
}; 

const createNote = async (req, res) =>{

    // Get the input from request
    const {title, body} = req.body;

    // Create a note
    const note = await Note.create({
        title,
        body
    });

    // respond with new note
    res.json({ note });
};

const updateNote = async(req, res) => {
    //Get Id of url 
    const noteId= req.params.id;

    //Get data of req body
    const {title, body} = req.body;

    //Find and update the record
    await Note.findByIdAndUpdate(noteId, {
        title,
        body
    });

    //Find updated node
    const note = await Note.findById(noteId);

    //Respond with it
    res.json({ note});
};

const deleteNote = async (req, res) => {
    //Get the Id
    const noteId = req.params.id

    //Find and delete the record
    await Note.deleteOne({ _id: noteId});

    //Respond
    res.json({success: "Record Deleted"});
};

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
};