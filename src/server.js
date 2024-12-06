import express from "express";
import cors from "cors";
import path from "path";
import env from "dotenv";
import IronsourceControllers from "./controllers/IronsourceControllers";
import UserControllers from "./controllers/UserControllers";
env.config();

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:8007", // ganti dengan URL frontend Anda
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

//MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

//ROUTES
app.use("/api", UserControllers);
app.use("/api", IronsourceControllers);

//LISTENER
app.listen(PORT, "0.0.0.0", () => {
  console.log(`
    SERVER RUNNING TO PORT ${PORT}
    `);
});
