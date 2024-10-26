import { useState } from 'react';

// Sample resale tickets data
const initialResaleTickets = [
    { id: 1, eventName: "Summer Music Festival", date: "2023-07-15", price: 55, seller: "Alice" },
    { id: 2, eventName: "Tech Conference 2023", date: "2023-08-22", price: 95, seller: "Bob" },
    { id: 3, eventName: "Food & Wine Expo", date: "2023-09-10", price: 80, seller: "Charlie" },
    { id: 4, eventName: "Art Gallery Opening", date: "2023-10-05", price: 40, seller: "David" },
    { id: 5, eventName: "Charity Run", date: "2023-11-12", price: 30, seller: "Eve" },
];

const TicketMarketplace = () => {
    const [resaleTickets, setResaleTickets] = useState(initialResaleTickets);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date'); // 'date', 'price', 'event'

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    const handlePurchase = (ticketId) => {
        // In a real application, you would send this data to your backend
        console.log(`Purchasing ticket with ID: ${ticketId}`);

        // Remove the purchased ticket from the list
        const updatedTickets = resaleTickets.filter(ticket => ticket.id !== ticketId);
        setResaleTickets(updatedTickets);
    };

    const filteredAndSortedTickets = resaleTickets
        .filter(ticket =>
            ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.seller.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
            if (sortBy === 'price') return a.price - b.price;
            if (sortBy === 'event') return a.eventName.localeCompare(b.eventName);
            return 0;
        });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-balck">Ticket Resale Marketplace</h1>

            <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
                <input
                    type="text"
                    placeholder="Search events or sellers"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-4 md:mb-0 w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center">
                    <label htmlFor="sortBy" className="mr-2 text-gray-700">Sort by:</label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={handleSort}
                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="date">Date</option>
                        <option value="price">Price</option>
                        <option value="event">Event Name</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold mb-2 text-black">{ticket.eventName}</h2>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Date:</span> {ticket.date}</p>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Price:</span> ${ticket.price}</p>
                        <p className="text-gray-600 mb-4"><span className="font-medium">Seller:</span> {ticket.seller}</p>
                        <button
                            onClick={() => handlePurchase(ticket.id)}
                            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                        >
                            Purchase Ticket
                        </button>
                    </div>
                ))}
            </div>

            {filteredAndSortedTickets.length === 0 && (
                <p className="text-center text-gray-600 mt-8">No tickets found matching your search.</p>
            )}
        </div>
    );
};

export default TicketMarketplace;