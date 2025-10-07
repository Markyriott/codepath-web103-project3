import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI';
import '../css/Event.css'

const Event = (props) => {

    const [event, setEvent] = useState([])
    const [time, setTime] = useState([])
    const [date, setDate] = useState([])
    const [remaining, setRemaining] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventsById(props.id)
                setEvent(eventData)

                const dateData = new Date(eventData.date);
                setDate(dateData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'}));
                setTime(dateData.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true}));
                setRemaining(calculateTimeRemaining(dateData));
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    const calculateTimeRemaining = (eventDate) => {
        const now = new Date();

        const isPassed = eventDate < now;

        const laterDate = isPassed ? now : eventDate;
        const earlierDate = isPassed ? eventDate : now;

        let years = laterDate.getFullYear() - earlierDate.getFullYear();
        let months = laterDate.getMonth() - earlierDate.getMonth();
        let days = laterDate.getDate() - earlierDate.getDate();

        if (days < 0) {
            const prevMonth = new Date(laterDate.getFullYear(), laterDate.getMonth(), 0);
            days += prevMonth.getDate();
            months -= 1;
        }

        if (months < 0) {
            months += 12;
            years -= 1;
        }

        const totalMonths = years * 12 + months;

        return(`${isPassed ? -totalMonths : totalMonths} months, ${isPassed ? -days : days} days`)
    }

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const timePart = event.date.split('T')[1].split('.')[0];
    //             console.log(timePart);
    //             const result = await dates.formatTime(event.time);
    //             setTime(result)
    //         }
    //         catch (error) {
    //             throw error
    //         }
    //     }) ()
    // }, [event])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const timeRemaining = await dates.formatRemainingTime(event.time)
    //             setRemaining(timeRemaining)
    //             dates.formatNegativeTimeRemaining(remaining, event.id)
    //         }
    //         catch (error) {
    //             throw error
    //         }
    //     }) ()
    // }, [event])

    return (
        <article className='event-information'>
            <img src={event.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>{`Time until event: ${remaining}`}</p>
                </div>
            </div>
        </article>
    )
}

export default Event