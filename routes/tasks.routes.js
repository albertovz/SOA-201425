import { taskController } from "../controllers/task.controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import multer from "multer";

const task = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets')
},
filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    console.log(file.originalname)
    cb(null, `${file.originalname}`)
}
});

const upload = multer({ storage });

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secret');
      req.user = decoded.sub;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
};

task.get("/view/list", verifyToken, (req, res) => taskController.task_list(req, res));
task.get("/view/details/:id", verifyToken, (req, res) => taskController.task_list_details(req, res));
task.post("/create", (req, res) => taskController.task_create(req, res));
task.put("/status", verifyToken, (req, res) => taskController.task_status(req, res));
// task.put("/update/password", verifyToken, (req, res) => userController.user_update_password(req, res));
// task.put("/update/profile", upload.single("imgProfile"), verifyToken, (req, res) => userController.user_update_profile(req, res));
// task.post("/login", (req, res) => userController.user_login(req, res));

export default task;