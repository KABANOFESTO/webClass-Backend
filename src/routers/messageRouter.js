import express from "express";
import Message from "../models/userModel.js";
import passport from "passport";
import '../middleware/passport.js';

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    Message.find()
        .then(messages => {
            res.json({ messages })
        })
        .catch(error => res.json(error))


})

router.post("/sendMessage", async (req, res) => {
    try {
        const valationResult = await messageSchema.validateAsync(req.body);
        const message = new Message({
            name: valationResult.name,
            email: valationResult.email,
            message: valationResult.message
        })
        message.save()
            .then(result => {
                res.status(200).json({ message: 'message sent successful' })
            })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete("/:id/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { id } = req.params
    Message.deleteOne({ _id: id })
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(error => console.log(error))
})


export default router;