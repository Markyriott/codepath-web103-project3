import { pool } from "../config/database";

const getEvents = async (req, res) =>{
    try {
        const data = await pool.query('SELECT * FROM events ORDER BY id ASC');
    } catch(err){
        res.status(409).json({error: err.message});
    }
}

export default {getEvents};