const express = require('express');
const router = express.Router();
const { Room, Department, Hospital } = require('../models');


// create (insertimi ne tabelen room)
router.post("/", async (req,res) => {
    try{
        const {roomID,numri,depID} = req.body;

        const department = await Department.findOne({
            where: {
                departmentID: depID
            }
        });

        if(!department){
            return res.status(400).json({error: 'Department not found!'});
        }

        const newRoom = await Room.create(req.body);
        res.json(newRoom);
    }
    catch(error){
        console.error('Error creating room:', error);
        res.status(500).json({error: 'Failed to create room'});
    }
});


// read (me i pa rows ne tabelen rooms)
router.get('/', async (req, res) => {
    try{
        const rooms = await Room.findAll({
            include: [
                {
                    model: Department,
                    attributes: ['emri'],
                    include: [
                        {
                            model: Hospital,
                            attributes: ['emri'],
                            order: [['emri', 'DESC']]
                        }
                    ]
                }
            ]
        });
        res.json(rooms);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching rooms' });
    }
});


// update (manipulo me te dhena ne tabelen rooms)
router.put("/:roomID", async (req, res) => {
    try{
        const {numri,depID} = req.body;
        const roomID = req.params.roomID;

        const room = await Room.findOne({
            where: {
                roomID: roomID
            }
        });

        if(!room){
            return res.status(404).json({error: 'Dhoma nuk ekziston!'});
        }

        await Room.update(
            {numri,depID},
            {where: {
                roomID: roomID
            }}
        );

        res.status(200).json({message: 'Room updated successfully!'});
    }
    catch(error){
        console.error('Error updating room:', error);
        res.status(500).json({error: 'Failed to update room'});
    }
});


// delete (fshirja e nje dhome sipas ID se saj)
router.delete("/:roomID", async (req, res) => {
    try{
        const roomID = req.params.roomID;

        const room = await Room.findOne({
            where: {
                roomID: roomID
            }
        });

        if(!room){
            return res.status(404).json({error: 'Dhoma nuk ekziston!'});
        }

        await room.destroy();

        res.status(200).json({message: 'Room deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting room:', error);
        res.status(500).json({error: 'Failed to delete room'});
    }
});

module.exports = router;