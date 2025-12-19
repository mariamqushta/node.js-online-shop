import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function ConnectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.DB_URL);
  }

  cached.conn = await cached.promise;
  console.log("Connected to DB");
  return cached.conn;
}
