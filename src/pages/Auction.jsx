import { useState } from 'react';

// Sample auction items data
const initialAuctionItems = [
    { id: 1, eventName: "VIP Concert", date: "2023-12-01", startingBid: 100, highestBid: 100 },
    { id: 2, eventName: "Exclusive Art Exhibit", date: "2023-12-15", startingBid: 200, highestBid: 200 },
];

const Auction = () => {
    const [auctionItems, setAuctionItems] = useState(initialAuctionItems);
    const [bidAmount, setBidAmount] = useState('');

    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
    };

    const placeBid = (itemId) => {
        const updatedItems = auctionItems.map(item => {
            if (item.id === itemId && parseFloat(bidAmount) > item.highestBid) {
                return { ...item, highestBid: parseFloat(bidAmount) };
            }
            return item;
        });
        setAuctionItems(updatedItems);
        setBidAmount('');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">Auction for Premium Tickets</h1>
            <div className="grid gap-6 md:grid-cols-2">
                {auctionItems.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">{item.eventName}</h2>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Date:</span> {item.date}</p>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Starting Bid:</span> ${item.startingBid}</p>
                        <p className="text-gray-600 mb-4"><span className="font-medium">Highest Bid:</span> ${item.highestBid}</p>
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={handleBidChange}
                            className="mb-2 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your bid"
                        />
                        <button
                            onClick={() => placeBid(item.id)}
                            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                        >
                            Place Bid
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Auction;