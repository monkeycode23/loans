import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';

import 'react-calendar/dist/Calendar.css';

Modal.setAppElement('#root');  // Para evitar advertencias de accesibilidad.

const CalendarApp = ({onClick}) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onClick(date);
    //setShowModal(true);
  };

  const handleEventSubmit = () => {
    if (eventText.trim()) {
      const eventDate = selectedDate.toDateString();
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        if (!updatedEvents[eventDate]) {
          updatedEvents[eventDate] = [];
        }
        updatedEvents[eventDate].push(eventText);
        return updatedEvents;
      });
      setEventText("");
      setShowModal(false);
    }
  };

  const formatEvents = (date) => {
    const dateStr = date.toDateString();
    return events[dateStr] || [];
  };

  return (
    <div>
     
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={handleDateClick}
        className={"w-full rounded-md border border-stroke"}
      />
      <h2>Eventos para {date.toDateString()}:</h2>
      <ul>
        {formatEvents(date).map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>

      {/* Modal para agregar eventos */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Agregar Evento"
      >
        <h2>Agregar Evento</h2>
        <textarea
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Escribe el evento..."
        ></textarea>
        <button onClick={handleEventSubmit}>Agregar Evento</button>
        <button onClick={() => setShowModal(false)}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default CalendarApp;