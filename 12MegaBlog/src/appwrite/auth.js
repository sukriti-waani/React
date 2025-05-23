// Import the configuration file that contains the Appwrite URL and Project ID
// These values are usually stored in a separate config file for security and reusability
import conf from "../conf/conf.js";

// Import necessary classes from the Appwrite SDK
// - Client: to initialize and configure Appwrite
// - Account: to perform user authentication and account-related operations
// - ID: to generate unique user/document IDs
import { Client, Account, ID } from "appwrite";

// Define and export a class called AuthService
// This class will manage all authentication-related tasks (register, login, logout, get user info, etc.)
export class AuthService {
  // Create a new instance of the Appwrite Client to connect with the Appwrite backend
  client = new Client();

  // Declare a variable to store the Account instance, which will be initialized in the constructor
  account;

  // Constructor is automatically called when a new instance of AuthService is created
  constructor() {
    // Configure the client with the endpoint URL of the Appwrite server
    this.client
      .setEndpoint(conf.appwriteUrl) // e.g., "https://cloud.appwrite.io/v1"

      // Set the Appwrite Project ID (unique ID for your Appwrite project)
      .setProject(conf.appwriteProjectId); // e.g., "65abcd123xyz"

    // Initialize the Account service using the configured client
    // This lets us use all user-related methods like create, login, logout, get session, etc.
    this.account = new Account(this.client);
  }

  // Method to register/create a new account
  // Accepts an object with email, password, and name as properties
  async createAccount({ email, password, name }) {
    try {
      // Use Appwrite's account.create method to register a new user
      // ID.unique() generates a random unique ID for the new user
      const userAccount = await this.account.create(
        ID.unique(), // auto-generated user ID
        email, // user's email
        password, // user's password
        name // user's display name
      );

      // If the account was successfully created, automatically log in the user
      if (userAccount) {
        return this.login({ email, password });
      } else {
        // If something goes wrong, just return the userAccount object
        return userAccount;
      }
    } catch (error) {
      // If any error occurs during registration, throw it to be handled elsewhere
      throw error;
    }
  }

  // Method to log in an existing user using email and password
  async login({ email, password }) {
    try {
      // Create a new session (i.e., log the user in) using Appwrite's email+password method
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      // If login fails, throw the error to handle it in the UI
      throw error;
    }
  }

  // Method to get the currently logged-in user's details
  async getCurrentUser() {
    try {
      // Fetch and return current user info (if someone is logged in)
      return await this.account.get();
    } catch (error) {
      // If no user is logged in or an error occurs, log the error
      console.log("Appwrite service : getCurrentUser :: error", error);
    }

    // If something went wrong, return null
    return null;
  }

  // Method to log out the currently logged-in user
  async logout() {
    try {
      // Delete all sessions of the current user, effectively logging them out
      await this.account.deleteSessions();
    } catch (error) {
      // Log any errors that occur during logout
      console.log("Appwrite service : logout :: error", error);
    }
  }
}

// Create a single (singleton) instance of the AuthService class
// This way, you don’t need to create multiple instances across your app
const authService = new AuthService();

// Export the instance as the default export
// So you can import and use it like `import AuthService from "./authService"`
export default authService;
