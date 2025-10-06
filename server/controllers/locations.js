import { pool } from "../config/database";

const getLocations = async (req, res) =>{
    try {
        const data = await pool.query('SELECT * FROM locations ORDER BY id ASC');
    } catch(err){
        res.status(409).json({error: err.message});
    }
}

export default {getLocations};