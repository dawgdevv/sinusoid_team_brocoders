import { Client, Databases, ID, Query } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const id = ID.unique();

const query = new Query();

export { client, databases, id, query };
