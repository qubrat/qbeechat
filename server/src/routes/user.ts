import "module-alias/register";
import express from "express";
import controller from "@/controllers/user";

const router = express.Router();

router.post("/", controller.register);
router.post("/login", controller.auth);

export = router;
