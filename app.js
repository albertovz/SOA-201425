import express from "express";
import cors from "cors";

import { api } from "./config/config.js";

import task from "./routes/tasks.routes.js";
import user from "./routes/user.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/tasks", task);
app.use("/api/v1/users", user);

app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
});