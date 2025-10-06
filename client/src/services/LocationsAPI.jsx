const getAllLocations = async ()=> {
    try{
        const res = await fetch('/api/locations');
        const data = await res.json();
        return data;
    } catch (err){
        console.log('Error fetching data', err);
    }
}

const getLocationByID = async (id)=> {
    try{
        const res = await fetch(`api/locations/${id}`);
        const data = await res.json();
        return data;
    } catch (err){
        console.log('Error fetching data', err);
    }
}

export default { getAllLocations, getLocationByID }