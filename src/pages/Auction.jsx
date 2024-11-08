import { useState, useEffect } from 'react';
import { databases } from '../appwrite/config';
import { AuctionService } from '../services/auctionservices';

function Auction() {
    const [auctionItems, setAuctionItems] = useState([]);
    const [bidAmount, setBidAmount] = useState('');
    const [timer, setTimer] = useState(300); // 5 minutes countdown
    const username = localStorage.getItem('hive_username');

    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
    };

    useEffect(() => {
        init();
        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const placeBid = async (itemId) => {
        try {
            const userId = username; // Replace with actual user ID
            await AuctionService.placeBid(itemId, userId, parseFloat(bidAmount));
            const updatedItems = auctionItems.map(item => {
                if (item.$id === itemId && parseFloat(bidAmount) > item.highest_bid) {
                    return { ...item, highest_bid: parseFloat(bidAmount) };
                }
                return item;
            });
            setAuctionItems(updatedItems);
            setBidAmount('');
        } catch (error) {
            console.error("Error placing bid:", error);
        }
    };

    const init = async () => {
        try {
            const response = await databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_DATABASE_ID_AUCTION
            );
            setAuctionItems(response.documents);
        }
        catch (error) {
            console.error(error);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">Auction for Premium Tickets</h1>
            <div className="text-center mb-4">
                <span className="text-xl font-semibold">Time Remaining: {formatTime(timer)}</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {auctionItems.map(item => (
                    <div key={item.$id} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">{item.event_name}</h2>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Date:</span> {item.event_date}</p>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Starting Bid:</span> {item.starting_bid}</p>
                        <p className="text-gray-600 mb-4"><span className="font-medium">Highest Bid:</span> {item.highest_bid}</p>
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={handleBidChange}
                            className="mb-2 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your bid"
                        />
                        <button
                            onClick={() => placeBid(item.$id)}
                            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                        >
                            Place Bid
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Auction;