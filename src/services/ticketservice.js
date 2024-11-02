import { databases, id } from "../appwrite/config";
import { Query } from "appwrite";

export class TicketService {
  static async createTicket(eventId, userId, price) {
    const ticketNumber = this.generateTicketNumber();

    try {
      const ticket = await databases.createDocument("", "tickets", id, {
        ticket_number: ticketNumber,
        event_id: eventId,
        user_id: userId,
        price: price,
        status: "active",
        created_at: new Date().toISOString(),
        qr_code: `${ticketNumber}-${eventId}-${userId}`, // Base for QR code generation
        is_used: false,
        is_resale: false,
      });
      return ticket;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }

  static generateTicketNumber() {
    // Generate unique 12-digit ticket number
    const timestamp = Date.now().toString().slice(-10);
    const random = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    return `TIX${timestamp}${random}`;
  }

  static async getEventTickets(eventId) {
    try {
      const tickets = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_TICKETS,
        [Query.equal("event_id", eventId)]
      );
      return tickets;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  }

  static async getUserTickets(userId) {
    try {
      const tickets = await databases.listDocuments(
        "import.meta.env.VITE_APPWRITE_DATABASE_ID",
        "import.meta.env.VITE_APPWRITE_COLLECTION_ID_TICKETS",
        [Query.equal("user_id", userId)]
      );
      return tickets;
    } catch (error) {
      console.error("Error fetching user tickets:", error);
      throw error;
    }
  }
}
export default TicketService;
