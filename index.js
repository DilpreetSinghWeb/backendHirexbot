import express from 'express';
import cors from 'cors';
import "./config/dotenv.js"
import homeRoutes from "./routes/homeRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

  

// Routes
app.use('/',homeRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
