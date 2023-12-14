import "module-alias/register";
import express from "express";
import { loginLimiter } from "@/middleware/loginLimiter";
import controller from "@/controllers/auth.controllers";

const router = express.Router();

router.post("/", loginLimiter, controller.login);
router.post("/register", loginLimiter, controller.register);
router.get("/refresh", controller.refresh);
router.post("/logout", controller.logout);

export = router;
