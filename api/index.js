import app from "../index.js"; // Import your existing app
import serverless from "serverless-http";

export default serverless(app);