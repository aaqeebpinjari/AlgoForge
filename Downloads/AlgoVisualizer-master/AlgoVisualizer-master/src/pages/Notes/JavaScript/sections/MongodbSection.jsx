import React from "react";

const MongodbSection = ({ copyCode, copiedCode }) => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div className="card">
        <h2>
          <i className="fas fa-database"></i> MongoDB with JavaScript
        </h2>
        <p>
          MongoDB is a NoSQL database that stores data in flexible, JSON-like
          documents. Here's how to work with MongoDB in JavaScript using the
          native driver.
        </p>

        <h3>MongoDB Connection Setup</h3>
        <div className="code-container">
          <button
            className={`copy-btn ${
              copiedCode === "connection" ? "copied" : ""
            }`}
            onClick={() =>
              copyCode(
                `// Install MongoDB driver: npm install mongodb

const { MongoClient } = require('mongodb');

// Connection configuration
class MongoDBConnection {
    constructor() {
        // Local MongoDB connection
        this.localUri = "mongodb://localhost:27017";
        
        // MongoDB Atlas (cloud) connection
        this.atlasUri = "mongodb+srv://username:password@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority";
        
        this.dbName = "mydatabase";
        this.client = null;
    }

    // Connect to MongoDB
    async connect(useAtlas = false) {
        const uri = useAtlas ? this.atlasUri : this.localUri;
        
        try {
            this.client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            
            await this.client.connect();
            console.log("✅ Connected to MongoDB successfully");
            
            return this.client.db(this.dbName);
        } catch (error) {
            console.error("❌ Connection failed:", error.message);
            throw error;
        }
    }

    // Get collection
    getCollection(collectionName) {
        if (!this.client) {
            throw new Error("Database not connected. Call connect() first.");
        }
        return this.client.db(this.dbName).collection(collectionName);
    }

    // Close connection
    async close() {
        if (this.client) {
            await this.client.close();
            console.log("🔌 MongoDB connection closed");
        }
    }
}

// Usage example
async function main() {
    const dbManager = new MongoDBConnection();
    
    try {
        const database = await dbManager.connect(); // Use local database
        const usersCollection = dbManager.getCollection("users");
        
        console.log("🚀 Database operations ready");
        return usersCollection;
        
    } catch (error) {
        console.error("Application failed to start:", error);
        process.exit(1);
    }
}

// Export for use in other files
module.exports = { MongoDBConnection, main };`,
                "connection"
              )
            }
          >
            {copiedCode === "connection" ? "✅ Copied!" : "📋 Copy"}
          </button>
          <pre className="language-javascript">{`// Install MongoDB driver: npm install mongodb

const { MongoClient } = require('mongodb');

// Connection configuration
class MongoDBConnection {
    constructor() {
        // Local MongoDB connection
        this.localUri = "mongodb://localhost:27017";
        
        // MongoDB Atlas (cloud) connection
        this.atlasUri = "mongodb+srv://username:password@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority";
        
        this.dbName = "mydatabase";
        this.client = null;
    }

    // Connect to MongoDB
    async connect(useAtlas = false) {
        const uri = useAtlas ? this.atlasUri : this.localUri;
        
        try {
            this.client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            
            await this.client.connect();
            console.log("✅ Connected to MongoDB successfully");
            
            return this.client.db(this.dbName);
        } catch (error) {
            console.error("❌ Connection failed:", error.message);
            throw error;
        }
    }

    // Get collection
    getCollection(collectionName) {
        if (!this.client) {
            throw new Error("Database not connected. Call connect() first.");
        }
        return this.client.db(this.dbName).collection(collectionName);
    }

    // Close connection
    async close() {
        if (this.client) {
            await this.client.close();
            console.log("🔌 MongoDB connection closed");
        }
    }
}

// Usage example
async function main() {
    const dbManager = new MongoDBConnection();
    
    try {
        const database = await dbManager.connect(); // Use local database
        const usersCollection = dbManager.getCollection("users");
        
        console.log("🚀 Database operations ready");
        return usersCollection;
        
    } catch (error) {
        console.error("Application failed to start:", error);
        process.exit(1);
    }
}

// Export for use in other files
module.exports = { MongoDBConnection, main };`}</pre>
        </div>

        <h3>Complete CRUD Operations</h3>
        <p>
          Create, Read, Update, Delete operations with proper error handling:
        </p>
        <div className="code-container">
          <button
            className={`copy-btn ${copiedCode === "crud" ? "copied" : ""}`}
            onClick={() =>
              copyCode(
                `// User Service Class for CRUD operations
class UserService {
    constructor(collection) {
        this.collection = collection;
    }

    // CREATE - Insert single document
    async createUser(userData) {
        try {
            // Input validation
            if (!userData.name || !userData.email) {
                throw new Error("Name and email are required");
            }

            const result = await this.collection.insertOne({
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            console.log("👤 User created with ID:", result.insertedId);
            return { success: true, data: result, insertedId: result.insertedId };
            
        } catch (error) {
            console.error("❌ Error creating user:", error.message);
            return { success: false, error: error.message };
        }
    }

    // CREATE - Insert multiple documents
    async createMultipleUsers(usersArray) {
        try {
            const documents = usersArray.map(user => ({
                ...user,
                createdAt: new Date(),
                updatedAt: new Date()
            }));

            const result = await this.collection.insertMany(documents);
            console.log("📦 Inserted", result.insertedCount, "users");
            return { success: true, data: result };
            
        } catch (error) {
            console.error("❌ Error creating users:", error.message);
            return { success: false, error: error.message };
        }
    }

    // READ - Find all users with optional filtering
    async findAllUsers(filter = {}, options = {}) {
        try {
            const { 
                sort = { createdAt: -1 }, 
                limit = 0, 
                skip = 0 
            } = options;

            const users = await this.collection
                .find(filter)
                .sort(sort)
                .limit(limit)
                .skip(skip)
                .toArray();

            console.log("🔍 Found", users.length, "users");
            return { success: true, data: users, count: users.length };
            
        } catch (error) {
            console.error("❌ Error finding users:", error.message);
            return { success: false, error: error.message };
        }
    }

    // READ - Find user by ID
    async findUserById(userId) {
        try {
            const user = await this.collection.findOne({ _id: userId });
            
            if (!user) {
                console.log("⚠️ User not found with ID:", userId);
                return { success: false, error: "User not found" };
            }
            
            return { success: true, data: user };
            
        } catch (error) {
            console.error("❌ Error finding user:", error.message);
            return { success: false, error: error.message };
        }
    }

    // UPDATE - Update user by ID
    async updateUser(userId, updateData) {
        try {
            const result = await this.collection.updateOne(
                { _id: userId },
                { 
                    $set: {
                        ...updateData,
                        updatedAt: new Date()
                    } 
                }
            );

            if (result.matchedCount === 0) {
                return { success: false, error: "User not found" };
            }

            console.log("✏️ Updated user:", userId);
            return { 
                success: true, 
                data: result,
                modifiedCount: result.modifiedCount 
            };
            
        } catch (error) {
            console.error("❌ Error updating user:", error.message);
            return { success: false, error: error.message };
        }
    }

    // DELETE - Delete user by ID
    async deleteUser(userId) {
        try {
            const result = await this.collection.deleteOne({ _id: userId });

            if (result.deletedCount === 0) {
                return { success: false, error: "User not found" };
            }

            console.log("🗑️ Deleted user:", userId);
            return { success: true, deletedCount: result.deletedCount };
            
        } catch (error) {
            console.error("❌ Error deleting user:", error.message);
            return { success: false, error: error.message };
        }
    }
}

// Usage Example
async function demonstrateCRUD() {
    const { MongoDBConnection } = require('./db-connection');
    const dbManager = new MongoDBConnection();
    
    try {
        await dbManager.connect();
        const usersCollection = dbManager.getCollection("users");
        const userService = new UserService(usersCollection);

        // CREATE
        const newUser = await userService.createUser({
            name: "Alice Johnson",
            email: "alice@example.com",
            age: 28,
            city: "San Francisco"
        });

        // READ
        const allUsers = await userService.findAllUsers();
        const youngUsers = await userService.findAllUsers(
            { age: { $lt: 30 } },
            { sort: { name: 1 }, limit: 10 }
        );

        // UPDATE
        if (newUser.success) {
            await userService.updateUser(newUser.insertedId, {
                age: 29,
                occupation: "Software Developer"
            });
        }

        // DELETE
        // await userService.deleteUser(newUser.insertedId);

    } finally {
        await dbManager.close();
    }
}

module.exports = { UserService };`,
                "crud"
              )
            }
          >
            {copiedCode === "crud" ? "✅ Copied!" : "📋 Copy"}
          </button>
          <pre className="language-javascript">{`// User Service Class for CRUD operations
class UserService {
    constructor(collection) {
        this.collection = collection;
    }

    // CREATE - Insert single document
    async createUser(userData) {
        try {
            // Input validation
            if (!userData.name || !userData.email) {
                throw new Error("Name and email are required");
            }

            const result = await this.collection.insertOne({
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            console.log("👤 User created with ID:", result.insertedId);
            return { success: true, data: result, insertedId: result.insertedId };
            
        } catch (error) {
            console.error("❌ Error creating user:", error.message);
            return { success: false, error: error.message };
        }
    }

    // CREATE - Insert multiple documents
    async createMultipleUsers(usersArray) {
        try {
            const documents = usersArray.map(user => ({
                ...user,
                createdAt: new Date(),
                updatedAt: new Date()
            }));

            const result = await this.collection.insertMany(documents);
            console.log("📦 Inserted", result.insertedCount, "users");
            return { success: true, data: result };
            
        } catch (error) {
            console.error("❌ Error creating users:", error.message);
            return { success: false, error: error.message };
        }
    }

    // READ - Find all users with optional filtering
    async findAllUsers(filter = {}, options = {}) {
        try {
            const { 
                sort = { createdAt: -1 }, 
                limit = 0, 
                skip = 0 
            } = options;

            const users = await this.collection
                .find(filter)
                .sort(sort)
                .limit(limit)
                .skip(skip)
                .toArray();

            console.log("🔍 Found", users.length, "users");
            return { success: true, data: users, count: users.length };
            
        } catch (error) {
            console.error("❌ Error finding users:", error.message);
            return { success: false, error: error.message };
        }
    }

    // READ - Find user by ID
    async findUserById(userId) {
        try {
            const user = await this.collection.findOne({ _id: userId });
            
            if (!user) {
                console.log("⚠️ User not found with ID:", userId);
                return { success: false, error: "User not found" };
            }
            
            return { success: true, data: user };
            
        } catch (error) {
            console.error("❌ Error finding user:", error.message);
            return { success: false, error: error.message };
        }
    }

    // UPDATE - Update user by ID
    async updateUser(userId, updateData) {
        try {
            const result = await this.collection.updateOne(
                { _id: userId },
                { 
                    $set: {
                        ...updateData,
                        updatedAt: new Date()
                    } 
                }
            );

            if (result.matchedCount === 0) {
                return { success: false, error: "User not found" };
            }

            console.log("✏️ Updated user:", userId);
            return { 
                success: true, 
                data: result,
                modifiedCount: result.modifiedCount 
            };
            
        } catch (error) {
            console.error("❌ Error updating user:", error.message);
            return { success: false, error: error.message };
        }
    }

    // DELETE - Delete user by ID
    async deleteUser(userId) {
        try {
            const result = await this.collection.deleteOne({ _id: userId });

            if (result.deletedCount === 0) {
                return { success: false, error: "User not found" };
            }

            console.log("🗑️ Deleted user:", userId);
            return { success: true, deletedCount: result.deletedCount };
            
        } catch (error) {
            console.error("❌ Error deleting user:", error.message);
            return { success: false, error: error.message };
        }
    }
}

// Usage Example
async function demonstrateCRUD() {
    const { MongoDBConnection } = require('./db-connection');
    const dbManager = new MongoDBConnection();
    
    try {
        await dbManager.connect();
        const usersCollection = dbManager.getCollection("users");
        const userService = new UserService(usersCollection);

        // CREATE
        const newUser = await userService.createUser({
            name: "Alice Johnson",
            email: "alice@example.com",
            age: 28,
            city: "San Francisco"
        });

        // READ
        const allUsers = await userService.findAllUsers();
        const youngUsers = await userService.findAllUsers(
            { age: { $lt: 30 } },
            { sort: { name: 1 }, limit: 10 }
        );

        // UPDATE
        if (newUser.success) {
            await userService.updateUser(newUser.insertedId, {
                age: 29,
                occupation: "Software Developer"
            });
        }

        // DELETE
        // await userService.deleteUser(newUser.insertedId);

    } finally {
        await dbManager.close();
    }
}

module.exports = { UserService };`}</pre>
        </div>

        <h3>Advanced Queries & Aggregation Framework</h3>
        <div className="code-container">
          <button
            className={`copy-btn ${copiedCode === "queries" ? "copied" : ""}`}
            onClick={() =>
              copyCode(
                `// Advanced Query Operations
class AdvancedQueries {
    constructor(collection) {
        this.collection = collection;
    }

    // Complex search with multiple conditions
    async searchUsers(criteria = {}) {
        const {
            name,
            minAge,
            maxAge,
            city,
            emailPattern,
            sortBy = "createdAt",
            sortOrder = -1,
            page = 1,
            limit = 10
        } = criteria;

        // Build filter object dynamically
        const filter = {};
        
        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // Case insensitive
        }
        
        if (minAge || maxAge) {
            filter.age = {};
            if (minAge) filter.age.$gte = parseInt(minAge);
            if (maxAge) filter.age.$lte = parseInt(maxAge);
        }
        
        if (city) {
            filter.city = { $regex: city, $options: 'i' };
        }
        
        if (emailPattern) {
            filter.email = { $regex: emailPattern, $options: 'i' };
        }

        try {
            const skip = (page - 1) * limit;
            
            const [users, totalCount] = await Promise.all([
                this.collection
                    .find(filter)
                    .sort({ [sortBy]: sortOrder })
                    .skip(skip)
                    .limit(limit)
                    .toArray(),
                
                this.collection.countDocuments(filter)
            ]);

            return {
                success: true,
                data: users,
                pagination: {
                    page,
                    limit,
                    totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                    hasNext: page * limit < totalCount,
                    hasPrev: page > 1
                }
            };

        } catch (error) {
            console.error("❌ Search error:", error.message);
            return { success: false, error: error.message };
        }
    }

    // Aggregation pipeline for user analytics
    async getUserAnalytics() {
        const pipeline = [
            // Stage 1: Filter active users
            {
                $match: {
                    age: { $gte: 18 },
                    createdAt: { $exists: true }
                }
            },
            
            // Stage 2: Group by city with statistics
            {
                $group: {
                    _id: "$city",
                    totalUsers: { $sum: 1 },
                    averageAge: { $avg: "$age" },
                    maxAge: { $max: "$age" },
                    minAge: { $min: "$age" },
                    users: { $push: {
                        name: "$name",
                        email: "$email",
                        age: "$age"
                    }}
                }
            },
            
            // Stage 3: Project calculated fields
            {
                $project: {
                    city: "$_id",
                    totalUsers: 1,
                    averageAge: { $round: ["$averageAge", 1] },
                    maxAge: 1,
                    minAge: 1,
                    ageRange: { 
                        $concat: [
                            { $toString: "$minAge" }, 
                            " - ", 
                            { $toString: "$maxAge" }
                        ]
                    },
                    userCount: "$totalUsers",
                    _id: 0
                }
            },
            
            // Stage 4: Sort by total users descending
            {
                $sort: { totalUsers: -1 }
            },
            
            // Stage 5: Limit to top 10 cities
            {
                $limit: 10
            }
        ];

        try {
            const analytics = await this.collection.aggregate(pipeline).toArray();
            
            console.log("📊 Analytics generated for", analytics.length, "cities");
            return { success: true, data: analytics };
            
        } catch (error) {
            console.error("❌ Analytics error:", error.message);
            return { success: false, error: error.message };
        }
    }

    // Text search implementation
    async textSearch(searchTerm, options = {}) {
        const { limit = 10, skip = 0 } = options;

        try {
            // Create text index first (run once):
            // await this.collection.createIndex({ name: "text", email: "text", city: "text" });
            
            const results = await this.collection
                .find({ $text: { $search: searchTerm } })
                .project({ score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .limit(limit)
                .skip(skip)
                .toArray();

            return { 
                success: true, 
                data: results,
                searchTerm,
                resultsCount: results.length
            };
            
        } catch (error) {
            console.error("❌ Text search error:", error.message);
            return { success: false, error: error.message };
        }
    }

    // Bulk write operations
    async bulkOperations(operations) {
        try {
            const result = await this.collection.bulkWrite(operations, {
                ordered: false, // Continue on error
                writeConcern: { w: "majority" }
            });

            console.log("🔄 Bulk operations completed:", {
                inserted: result.insertedCount,
                updated: result.modifiedCount,
                deleted: result.deletedCount
            });

            return { success: true, data: result };
            
        } catch (error) {
            console.error("❌ Bulk operations error:", error.message);
            return { success: false, error: error.message };
        }
    }
}

// Index management
async function manageIndexes(collection) {
    try {
        // Create indexes for better performance
        await collection.createIndex({ email: 1 }, { unique: true });
        await collection.createIndex({ city: 1, age: 1 });
        await collection.createIndex({ createdAt: -1 });
        await collection.createIndex({ "location": "2dsphere" }); // For geospatial queries
        
        console.log("✅ Indexes created successfully");
        
        // List all indexes
        const indexes = await collection.indexes();
        console.log("📋 Available indexes:", indexes.map(idx => idx.name));
        
    } catch (error) {
        console.error("❌ Index management error:", error.message);
    }
}

// Usage example
async function demonstrateAdvancedFeatures() {
    const { MongoDBConnection } = require('./db-connection');
    const dbManager = new MongoDBConnection();
    
    try {
        await dbManager.connect();
        const usersCollection = dbManager.getCollection("users");
        const queryEngine = new AdvancedQueries(usersCollection);

        // Advanced search
        const searchResults = await queryEngine.searchUsers({
            minAge: 20,
            maxAge: 40,
            city: "York",
            page: 1,
            limit: 5
        });

        // Analytics
        const analytics = await queryEngine.getUserAnalytics();

        // Text search
        const textResults = await queryEngine.textSearch("john developer");

        console.log("🎯 Advanced features demonstrated successfully");
        
    } finally {
        await dbManager.close();
    }
}

module.exports = { AdvancedQueries, manageIndexes };`,
                "queries"
              )
            }
          >
            {copiedCode === "queries" ? "✅ Copied!" : "📋 Copy"}
          </button>
          <pre className="language-javascript">{`// Advanced Query Operations
class AdvancedQueries {
    constructor(collection) {
        this.collection = collection;
    }

    // Complex search with multiple conditions
    async searchUsers(criteria = {}) {
        const {
            name,
            minAge,
            maxAge,
            city,
            emailPattern,
            sortBy = "createdAt",
            sortOrder = -1,
            page = 1,
            limit = 10
        } = criteria;

        // Build filter object dynamically
        const filter = {};
        
        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // Case insensitive
        }
        
        if (minAge || maxAge) {
            filter.age = {};
            if (minAge) filter.age.$gte = parseInt(minAge);
            if (maxAge) filter.age.$lte = parseInt(maxAge);
        }
        
        if (city) {
            filter.city = { $regex: city, $options: 'i' };
        }
        
        if (emailPattern) {
            filter.email = { $regex: emailPattern, $options: 'i' };
        }

        try {
            const skip = (page - 1) * limit;
            
            const [users, totalCount] = await Promise.all([
                this.collection
                    .find(filter)
                    .sort({ [sortBy]: sortOrder })
                    .skip(skip)
                    .limit(limit)
                    .toArray(),
                
                this.collection.countDocuments(filter)
            ]);

            return {
                success: true,
                data: users,
                pagination: {
                    page,
                    limit,
                    totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                    hasNext: page * limit < totalCount,
                    hasPrev: page > 1
                }
            };

        } catch (error) {
            console.error("❌ Search error:", error.message);
            return { success: false, error: error.message };
        }
    }

    // Aggregation pipeline for user analytics
    async getUserAnalytics() {
        const pipeline = [
            // Stage 1: Filter active users
            {
                $match: {
                    age: { $gte: 18 },
                    createdAt: { $exists: true }
                }
            },
            
            // Stage 2: Group by city with statistics
            {
                $group: {
                    _id: "$city",
                    totalUsers: { $sum: 1 },
                    averageAge: { $avg: "$age" },
                    maxAge: { $max: "$age" },
                    minAge: { $min: "$age" },
                    users: { $push: {
                        name: "$name",
                        email: "$email",
                        age: "$age"
                    }}
                }
            },
            
            // Stage 3: Project calculated fields
            {
                $project: {
                    city: "$_id",
                    totalUsers: 1,
                    averageAge: { $round: ["$averageAge", 1] },
                    maxAge: 1,
                    minAge: 1,
                    ageRange: { 
                        $concat: [
                            { $toString: "$minAge" }, 
                            " - ", 
                            { $toString: "$maxAge" }
                        ]
                    },
                    userCount: "$totalUsers",
                    _id: 0
                }
            },
            
            // Stage 4: Sort by total users descending
            {
                $sort: { totalUsers: -1 }
            },
            
            // Stage 5: Limit to top 10 cities
            {
                $limit: 10
            }
        ];

        try {
            const analytics = await this.collection.aggregate(pipeline).toArray();
            
            console.log("📊 Analytics generated for", analytics.length, "cities");
            return { success: true, data: analytics };
            
        } catch (error) {
            console.error("❌ Analytics error:", error.message);
            return { success: false, error: error.message };
        }
    }

    // Text search implementation
    async textSearch(searchTerm, options = {}) {
        const { limit = 10, skip = 0 } = options;

        try {
            // Create text index first (run once):
            // await this.collection.createIndex({ name: "text", email: "text", city: "text" });
            
            const results = await this.collection
                .find({ $text: { $search: searchTerm } })
                .project({ score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .limit(limit)
                .skip(skip)
                .toArray();

            return { 
                success: true, 
                data: results,
                searchTerm,
                resultsCount: results.length
            };
            
        } catch (error) {
            console.error("❌ Text search error:", error.message);
            return { success: false, error: error.message };
        }
    }

    // Bulk write operations
    async bulkOperations(operations) {
        try {
            const result = await this.collection.bulkWrite(operations, {
                ordered: false, // Continue on error
                writeConcern: { w: "majority" }
            });

            console.log("🔄 Bulk operations completed:", {
                inserted: result.insertedCount,
                updated: result.modifiedCount,
                deleted: result.deletedCount
            });

            return { success: true, data: result };
            
        } catch (error) {
            console.error("❌ Bulk operations error:", error.message);
            return { success: false, error: error.message };
        }
    }
}

// Index management
async function manageIndexes(collection) {
    try {
        // Create indexes for better performance
        await collection.createIndex({ email: 1 }, { unique: true });
        await collection.createIndex({ city: 1, age: 1 });
        await collection.createIndex({ createdAt: -1 });
        await collection.createIndex({ "location": "2dsphere" }); // For geospatial queries
        
        console.log("✅ Indexes created successfully");
        
        // List all indexes
        const indexes = await collection.indexes();
        console.log("📋 Available indexes:", indexes.map(idx => idx.name));
        
    } catch (error) {
        console.error("❌ Index management error:", error.message);
    }
}

// Usage example
async function demonstrateAdvancedFeatures() {
    const { MongoDBConnection } = require('./db-connection');
    const dbManager = new MongoDBConnection();
    
    try {
        await dbManager.connect();
        const usersCollection = dbManager.getCollection("users");
        const queryEngine = new AdvancedQueries(usersCollection);

        // Advanced search
        const searchResults = await queryEngine.searchUsers({
            minAge: 20,
            maxAge: 40,
            city: "York",
            page: 1,
            limit: 5
        });

        // Analytics
        const analytics = await queryEngine.getUserAnalytics();

        // Text search
        const textResults = await queryEngine.textSearch("john developer");

        console.log("🎯 Advanced features demonstrated successfully");
        
    } finally {
        await dbManager.close();
    }
}

module.exports = { AdvancedQueries, manageIndexes };`}</pre>
        </div>
      </div>
    </section>
  );
};

export default MongodbSection;
