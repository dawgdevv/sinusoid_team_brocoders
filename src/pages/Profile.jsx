import { useState } from 'react'

const tickets = [
    { id: 1, eventName: 'Concert A', date: '2024-05-15', quantity: 2, seats: ['A1', 'A2'], venue: 'Stadium X' },
    { id: 2, eventName: 'Festival B', date: '2024-06-20', quantity: 1, seats: ['B5'], venue: 'Park Y' },
]

export default function Component() {
    const [user, /*setUser*/] = useState({
        name: 'Nishant Raj',
        email: 'nishantrajcs26@gmail.com',
        joinDate: '19/11/2024',
    })
    const [activeTab, setActiveTab] = useState('profile')
    const [selectedTicket, setSelectedTicket] = useState(null)

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    const openTicketDetails = (ticket) => {
        setSelectedTicket(ticket)
    }

    const closeTicketDetails = () => {
        setSelectedTicket(null)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <div className="mb-4">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-black  text-gray-950' : 'text-gray-950'}`}
                        onClick={() => handleTabChange('profile')}
                    >
                        Profile Information
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'tickets' ? 'border-b-2 border-black text-gray-950' : 'text-gray-950'}`}
                        onClick={() => handleTabChange('tickets')}
                    >
                        My Tickets
                    </button>
                </div>
            </div>
            {activeTab === 'profile' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={user.name}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={user.email}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">Join Date</label>
                            <input
                                id="joinDate"
                                type="text"
                                value={user.joinDate}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            />
                        </div>
                        <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Edit Profile
                        </button>
                    </div>
                </div>
            )}
            {activeTab === 'tickets' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
                    {tickets.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {tickets.map((ticket) => (
                                <li key={ticket.id} className="py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
                                            <p className="text-sm text-gray-600">Date: {ticket.date}</p>
                                            <p className="text-sm text-gray-600">Quantity: {ticket.quantity}</p>
                                        </div>
                                        <button
                                            onClick={() => openTicketDetails(ticket)}
                                            className="bg-black text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center py-4">You don&apos;t have any tickets yet.</p>
                    )}
                </div>
            )}
            {selectedTicket && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">{selectedTicket.eventName} Details</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="text"
                                    value={selectedTicket.date}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Venue</label>
                                <input
                                    type="text"
                                    value={selectedTicket.venue}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Seats</label>
                                <input
                                    type="text"
                                    value={selectedTicket.seats.join(', ')}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeTicketDetails}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}