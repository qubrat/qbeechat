import "module-alias/register";
import express from "express";
import controller from "@/controllers/chat";

const router = express.Router();

router.get("/", controller.getChats);
router.get("/:id", controller.getChat);

export = router;
