import { pool } from "../config/database.js";

const getLocations = async (req, res) =>{
    try {
        const data = await pool.query(`SELECT * FROM locations ORDER BY id ASC`);
        res.status(200).json(data.rows);
    } catch(err){
        res.status(409).json({error: err.message});
    }
}

const getLocationByID = async (req, res) =>{
    const Id = req.params.locationId;
    try{
        const data = await pool.query('SELECT * FROM locations WHERE id=$1', [Id]);
        res.status(200).json(data.rows[0]);    
    } catch (err){
        res.status(409).json({error: err.message});
    }
}

export default {getLocations, getLocationByID};