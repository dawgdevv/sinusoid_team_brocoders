import { events } from '../constant/constant';

const Events = () => {


    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-black">Upcoming Events</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-3 text-black">{event.name}</h2>
                        <p className="text-gray-600 mb-2">
                            <span className="font-medium text-gray-800">Date:</span> {event.date}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <span className="font-medium text-gray-800">Location:</span> {event.location}
                        </p>
                        <button className="w-full bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
                            Book Tickets
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;