import mongoose, { Mongoose } from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

if (process.env.NODE_ENV === "development") {
}

const opts = {
  bufferCommands: false,
};
async function connectDB() {
  if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
      mongoose: {
        conn?: Mongoose | null;
        promise?: Promise<Mongoose> | null;
      };
    };
    let cached = globalWithMongo.mongoose;

    if (!cached) {
      cached = globalWithMongo.mongoose = { conn: null, promise: null };
    }
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(DATABASE_URL!, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } else {
    return await mongoose.connect(DATABASE_URL!, opts);
  }
}

export default connectDB;