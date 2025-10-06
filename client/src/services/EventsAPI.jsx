const getAllEvents = async ()=>{
    try{
        const res = await fetch('/api/events');
        const data = await res.json();
        return data;
    } catch (err){
        console.log('Error fetching data', err);
    }
}

const getEventByID = async (id)=>{
    try{
        const res = await fetch (`api/events/${id}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log('Error fetching data', err);
    }
}

export default { getAllEvents, getEventByID };