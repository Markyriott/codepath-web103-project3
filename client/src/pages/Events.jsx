import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import EventsAPI from '../services/EventsAPI';
import LocationsAPI from '../services/LocationsAPI';
import '../css/Events.css'

const locationIndex = Object.freeze({
    "Hunter's Lodge" : 1,
    "Arasaka Tower": 2,
    "Federal Bureau of Control": 3,
    "Raccoon Police Station": 4
});

const Events = ({}) => {
    const [events, setEvents] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('Default');

    useEffect(()=>{
        (async ()=>{
            try{
                const eventData = await EventsAPI.getAllEvents();
                setEvents(eventData);
            } catch(err){
                throw err;
            }
        })
    }, [])
   
    useEffect(()=>{
        (async ()=>{
            try{                
                const eventData = selectedFilter == 'Default' ? await EventsAPI.getAllEvents() : await LocationsAPI.getLocationEvents(locationIndex[selectedFilter]);
                setEvents(eventData);
            } catch (err){
                throw err;
            }
        }) () 
    }, [selectedFilter])
    
    const handleChange = (e) =>{
        setSelectedFilter(e.target.value);
    }

    return(
        <div className='events'>
            <header>
                <label htmlFor="event-filters">Filter By</label>
                <select name="event-filters" value={selectedFilter} onChange={handleChange}>
                    <option value="Default">Default</option>
                    <option value="Hunter's Lodge">Hunter's Lodge</option>
                    <option value="Arasaka Tower">Arasaka Tower</option>
                    <option value="Raccoon Police Station">Raccoon Police Station</option>
                    <option value="Federal Bureau of Control">Federal Bureau of Control</option>
                </select>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events;