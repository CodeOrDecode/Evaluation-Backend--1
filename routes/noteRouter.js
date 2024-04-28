const { Router } = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const Notemodel = require("../models/noteModel");


const noteRouter = Router();


noteRouter.post("/create", authmiddleware, async (req, res) => {
    const { title, description, userid, username } = req.body;

    try {
        let note = new Notemodel({ title, description, userid, username });
        await note.save();
        res.status(200).json({ message: "note created successfully" });
    } catch (error) {
        res.status(400).json({ message: "error creating note" });
    }

})

noteRouter.get("/allnote", authmiddleware, async (req, res) => {
    let userid = req.body.userid;

    try {
        let notes = await Notemodel.find({ userid })
        res.status(200).json({ message: "all notes", notes });
    } catch (error) {
        res.status(400).json({ message: "error getting notes" });
    }

})


noteRouter.patch("/update/:id", authmiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        await Notemodel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).json({ message: "note updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "error updating note" });
    }

})


noteRouter.delete("/delete/:id", authmiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        await Notemodel.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "note deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "error deleting note" });
    }

})


module.exports = noteRouter
