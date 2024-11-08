import { databases } from "../appwrite/config";
import { Query, ID } from "appwrite";

export class AuctionService {
  static async placeBid(auctionId, userId, bidAmount) {
    try {
      // Get current auction
      const auction = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_ID_AUCTION,
        auctionId
      );

      if (bidAmount <= auction.highest_bid) {
        throw new Error("Bid must be higher than current bid");
      }

      // Create bid record
      const bidId = ID.unique();
      const bid = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_ID_BIDS,
        bidId,
        {
          bid_id: bidId,
          auctionid: auctionId,
          bidder: userId,
          bid_amount: bidAmount,
          status: "pending",
          timestamp: new Date().toISOString(),
        }
      );

      // Check Hive Keychain
      if (typeof window.hive_keychain === "undefined") {
        throw new Error("Please install Hive Keychain extension first");
      }

      const customJsonData = {
        type: "auction_bid",
        auction_id: auctionId,
        bid_id: bidId,
        amount: bidAmount,
        timestamp: Date.now(),
      };

      return new Promise((resolve, reject) => {
        window.hive_keychain.requestCustomJson(
          userId,
          "dtix_auction",
          "Active",
          JSON.stringify(customJsonData),
          "Place Auction Bid",
          async (response) => {
            if (response.success) {
              // Update bid and auction
              await Promise.all([
                databases.updateDocument(
                  import.meta.env.VITE_APPWRITE_DATABASE_ID,
                  import.meta.env.VITE_APPWRITE_DATABASE_ID_BIDS,
                  bidId,
                  { status: "active" }
                ),
                databases.updateDocument(
                  import.meta.env.VITE_APPWRITE_DATABASE_ID,
                  import.meta.env.VITE_APPWRITE_DATABASE_ID_AUCTION,
                  auctionId,
                  {
                    highest_bid: bidAmount,
                    event_name: auction.event_name,
                  }
                ),
              ]);

              // Check if highest bid reached
              if (bidAmount >= auction.starting_bid * 2) {
                await this.completeAuction(auctionId, userId);
              }

              resolve(bid);
            } else {
              await databases.deleteDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_DATABASE_ID_BIDS,
                bidId
              );
              reject(new Error(response.message));
            }
          }
        );
      });
    } catch (error) {
      console.error("Error placing bid:", error);
      throw error;
    }
  }

  static async completeAuction(auctionId) {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_ID_AUCTION,
        auctionId,
        { status: "completed" }
      );

      // Create ticket for winner
      // Implementation depends on your ticket service
    } catch (error) {
      console.error("Error completing auction:", error);
      throw error;
    }
  }

  static async getAuctions() {
    return await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_DATABASE_ID_AUCTION
    );
  }

  static async getBidHistory(auctionId) {
    return await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_DATABASE_ID_BIDS,
      [Query.equal("auctionid", auctionId)]
    );
  }
}
