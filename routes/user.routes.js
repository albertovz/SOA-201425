import { userController } from "../controllers/user.controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import multer from "multer";

const router = Router();

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

router.get("/profile/list", verifyToken, (req, res) => userController.user_list(req, res));
router.get("/profile/:id", verifyToken, (req, res) => userController.user_profile(req, res));
router.post("/create", (req, res) => userController.user_create(req, res));
router.get("/view_img", (req, res) => userController.local_img(req, res));
router.put("/update/password", verifyToken, (req, res) => userController.user_update_password(req, res));
router.put("/update/profile", upload.single("imgProfile"), verifyToken, (req, res) => userController.user_update_profile(req, res));
router.post("/login", (req, res) => userController.user_login(req, res));

export default router;