// Import configuration file that contains Appwrite credentials like URL, project ID, database ID, etc.
import conf from "../conf.js";

// Import necessary modules from Appwrite SDK:
// - Client: to initialize the connection
// - ID: to generate unique IDs
// - Databases: for working with databases (CRUD operations)
// - Storage: for file upload/download/delete
// - Query: to filter data while fetching documents
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Define and export a class called 'Service' to handle database and storage operations
export class Service {
  // Create a new Appwrite client instance
  client = new Client();

  // Declare variables for database and storage operations
  databases;
  bucket;

  // Constructor runs when a new instance of Service is created
  constructor() {
    // Configure the client with Appwrite endpoint and project ID
    this.client
      .setEndpoint(conf.appwriteUrl) // Set the Appwrite endpoint URL (e.g., https://cloud.appwrite.io/v1)
      .setProject(conf.appwriteProjectId); // Set the Appwrite project ID from config

    // Initialize the Databases instance using the configured client
    this.databases = new Databases(this.client);

    // Initialize the Storage (bucket) instance using the configured client
    this.bucket = new Storage(this.client);
  }

  // Create a new blog post/document in the Appwrite database
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId, // ID of the database
        conf.appwriteCollectionId, // ID of the collection inside the database
        slug, // Unique document ID (slug acts as ID)
        {
          title, // Post title
          content, // Post content
          featuredImage, // Image URL or ID
          status, // Post status (e.g., 'active', 'draft')
          userId, // ID of the user who created the post
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  // Update an existing post/document by slug
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Document ID to be updated
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  // Delete a post/document by slug
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // Document ID to delete
      );
      return true; // Return true if successful
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false; // Return false if failed
    }
  }

  // Get a specific post by slug (document ID)
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // Document ID to retrieve
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }

  // Get a list of all posts matching certain queries (e.g., only "active" posts)
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries // Filtering queries, default is status = active
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // Upload a file (like an image) to the Appwrite storage bucket
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId, // ID of the bucket (storage container)
        ID.unique(), // Generate a unique ID for the file
        file // Actual file object (e.g., from form input)
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  // Delete a file from Appwrite storage bucket by file ID
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId, // Bucket ID
        fileId // File ID to delete
      );
      return true;
    } catch (error) {
      console.log("Appwrite service : deleteFile :: error", error);
      return false;
    }
  }

  // Get a preview URL of a stored file (useful for images)
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
      conf.appwriteBucketId, // Bucket ID
      fileId // File ID for which preview URL is requested
    );
  }
}

// Create and export a single instance of the Service class (Singleton pattern)
// So that the same object is reused across the app
const service = new Service();
export default service;
