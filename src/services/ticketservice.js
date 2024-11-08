// ticketService.js
import { databases } from "../appwrite/config";
import { ID } from "appwrite";

export class TicketService {
  static async createTicket(eventId, userId, price) {
    const ticketNumber = this.generateTicketNumber();
    const uniqueId = ID.unique();

    try {
      // Create ticket in Appwrite
      const ticket = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_ID_TICKETS,
        uniqueId,
        {
          ticket_number: ticketNumber,
          eventid: eventId,
          userid: userId,
          price: price,
          status: "pending",
          created_at: new Date().toISOString(),
          qr_code: `${ticketNumber}-${eventId}-${userId}`,
          is_used: false,
          is_resale: false,
        }
      );

      // Check if Hive Keychain is installed
      if (typeof window.hive_keychain === "undefined") {
        throw new Error("Please install Hive Keychain extension first");
      }

      // Create custom JSON data
      const customJsonData = {
        type: "ticket_purchase",
        ticket_id: uniqueId,
        event_id: eventId,
        ticket_number: ticketNumber,
        price: price,
        timestamp: Date.now(),
      };

      // Return promise for handling async Keychain operation
      return new Promise((resolve, reject) => {
        window.hive_keychain.requestCustomJson(
          userId,
          "dtix_tickets", // Custom JSON ID
          "Active", // Required auth type
          JSON.stringify(customJsonData),
          "Purchase Event Ticket",
          (response) => {
            if (response.success) {
              // Update ticket status to active after successful transaction
              databases.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_DATABASE_ID_TICKETS,
                uniqueId,
                { status: "active" }
              );
              console.log("Transaction successful:", response);
              resolve(ticket);
            } else {
              console.error("Transaction failed:", response.message);
              // Delete the ticket if transaction fails
              databases.deleteDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_DATABASE_ID_TICKETS,
                uniqueId
              );
              reject(new Error(response.message || "Transaction failed"));
            }
          }
        );
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }

  static generateTicketNumber() {
    const timestamp = Date.now().toString().slice(-10);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `TIX${timestamp}${random}`;
  }
}
