const Message = require('../models/Message');


exports.sendMessage = async (req, res) => {
    try {
        if (!req.body.content || req.body.content.trim() === '') {
            return res.status(400).json({ error: 'Content field is required' });
        }

        const senderId = req.user._id;

        const recipientId = req.params.recipientId;
        const newMessage = new Message({
            sender: senderId,
            recipient: recipientId,
            content: req.body.content,
        });

        await newMessage.save();

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getReceivedMessages = async (req, res) => {
    try {
        const userId = req.user._id;

        const messages = await Message.find({ recipient: userId }).populate({
            path: 'sender'
        })
            .sort({ createdAt: -1 });


        res.status(200).json({ messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getMessagesFromUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const senderId = req.params.senderId;

        const messages = await Message.find({ sender: senderId, recipient: userId })
            .populate({
                path: 'sender'
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
