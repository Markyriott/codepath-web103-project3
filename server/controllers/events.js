import { pool } from "../config/database.js";

const getEvents = async (req, res) =>{
    try {
        const data = await pool.query('SELECT * FROM events ORDER BY id ASC');
        res.status(200).json(data.rows);
    } catch(err){
        res.status(409).json({error: err.message});
    }
}

const getEventById = async (req, res) =>{
    const Id = req.params.eventId;

    try{
        const data = await pool.query('SELECT * FROM events WHERE id=$1', [Id]);
        res.status(200).json(data.rows[0]);
    } catch(err){
        res.status(409).json({error: err.message});
    }
}
export default {getEvents, getEventById};