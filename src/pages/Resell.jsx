import { useState } from 'react';

// Sample user's tickets data
const initialUserTickets = [
    { id: 1, eventName: "Summer Music Festival", date: "2023-07-15", price: 50 },
    { id: 2, eventName: "Tech Conference 2023", date: "2023-08-22", price: 100 },
    { id: 3, eventName: "Food & Wine Expo", date: "2023-09-10", price: 75 },
];

const ResellTickets = () => {
    const [userTickets, setUserTickets] = useState(initialUserTickets);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [resellPrice, setResellPrice] = useState('');

    const handleSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        setResellPrice(ticket.price.toString());
    };

    const handleResellPriceChange = (e) => {
        setResellPrice(e.target.value);
    };

    const handleResellTicket = () => {
        if (selectedTicket && resellPrice) {
            // In a real application, you would send this data to your backend
            console.log(`Listing ticket for ${selectedTicket.eventName} at $${resellPrice}`);

            // Update the ticket price in the userTickets state
            const updatedTickets = userTickets.map(ticket =>
                ticket.id === selectedTicket.id ? { ...ticket, price: parseFloat(resellPrice) } : ticket
            );
            setUserTickets(updatedTickets);

            // Reset selection
            setSelectedTicket(null);
            setResellPrice('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">Resell Your Tickets</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-black">Your Tickets</h2>
                    <ul className="space-y-4">
                        {userTickets.map((ticket) => (
                            <li
                                key={ticket.id}
                                className={`p-3 rounded-md cursor-pointer transition-colors duration-200 ${selectedTicket && selectedTicket.id === ticket.id
                                    ? 'bg-blue-100 border-2 border-blue-500'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                onClick={() => handleSelectTicket(ticket)}
                            >
                                <p className="font-semibold">{ticket.eventName}</p>
                                <p className="text-sm text-gray-600">Date: {ticket.date}</p>
                                <p className="text-sm text-gray-600">Current Price: ${ticket.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-black">Resell Selected Ticket</h2>
                    {selectedTicket ? (
                        <div>
                            <p className="mb-2"><span className="font-semibold">Event:</span> {selectedTicket.eventName}</p>
                            <p className="mb-4"><span className="font-semibold">Date:</span> {selectedTicket.date}</p>
                            <div className="mb-4">
                                <label htmlFor="resellPrice" className="block text-sm font-medium text-gray-700">New Price ($):</label>
                                <input
                                    type="number"
                                    id="resellPrice"
                                    value={resellPrice}
                                    onChange={handleResellPriceChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <button
                                onClick={handleResellTicket}
                                className="w-full bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                            >
                                List for Resale
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600">Select a ticket to resell</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResellTickets;