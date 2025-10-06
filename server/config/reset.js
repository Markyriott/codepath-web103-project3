import { pool } from './database.js';
import locationData from '../data/locations.js';

const createTables = async () => {
    await pool.query(`DROP TABLE IF EXISTS events;`);    
    await pool.query(`DROP TABLE IF EXISTS locations;`);

    const createLocationsTableQuery = `
        CREATE TABLE IF NOT EXISTS locations(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
        );
    `
    const createEventsTableQuery = `
        CREATE TABLE IF NOT EXISTS events(
        id SERIAL PRIMARY KEY,
        location INTEGER REFERENCES locations(id),
        title VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        image VARCHAR(255) NOT NULL
        );
    `

    try {
        await pool.query(createLocationsTableQuery);
        await pool.query(createEventsTableQuery);
        console.log('tables created successfully');
    } catch (error) {
        console.error('error creating tables', error);
    }
}

const seedTables = async ()=>{
    await createTables();

    locationData.forEach((location) =>{
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, city, state, image) VALUES ($1, $2, $3, $4, $5);'
        };

        const values = [
            location.name,
            location.address,
            location.city,
            location.state,
            location.image
        ];
    
        pool.query(insertQuery, values, (err, res)=>{
            if (err) {
                console.error('error inserting location', err);
                return;
            }
    
            console.log('successfully added location', location.name)
        })
    })

}

seedTables();