import { useState, useEffect } from 'react';
import { databases } from '../appwrite/config';
import { TicketService } from '../services/ticketservice';

function Events() {
    const [events, setEvents] = useState([]);
    const [bookingStatus, setBookingStatus] = useState({
        loading: false,
        error: null,
        success: false
    });

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const response = await databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_DATABASE_ID_EVENTS
            );
            setEvents(response.documents);
        } catch (error) {
            console.error(error);
        }
    }

    const handleBookTicket = async (event) => {
        setBookingStatus({ loading: true, error: null, success: false });
        try {
            const userId = localStorage.getItem('hive_username'); // Get logged in user ID
            if (!userId) {
                throw new Error('User not logged in');
            }

            // Verify price is a valid number
            const price = parseFloat(event.price);
            if (isNaN(price) || price <= 0) {
                throw new Error('Invalid ticket price');
            }

            await TicketService.createTicket(event.$id, userId, price);
            setBookingStatus({
                loading: false,
                error: null,
                success: true
            });
            alert('Ticket booked successfully!');
        } catch (error) {
            setBookingStatus({
                loading: false,
                error: error.message,
                success: false
            });
            alert(`Booking failed: ${error.message}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-black">Upcoming Events</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div key={event.$id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-3 text-black">{event.name}</h2>
                        <p className="text-gray-600 mb-2">
                            <span className="font-medium text-gray-800">Date:</span> {event.date}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <span className="font-medium text-gray-800">Location:</span> {event.location}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <span className="font-medium text-gray-800">Price:</span> {event.price}Rs
                        </p>
                        <button
                            onClick={() => handleBookTicket(event)}
                            disabled={bookingStatus.loading}
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400"
                        >
                            {bookingStatus.loading ? 'Booking...' : 'Book Ticket'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Events;