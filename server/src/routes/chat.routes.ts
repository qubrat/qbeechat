import "module-alias/register";
import express from "express";
import controller from "@/controllers/chat.controllers";
import groupRoutes from "@/routes/group.routes";
import { authorize } from "@/middleware/auth";

const router = express.Router();

router.use(authorize);
router.get("/", controller.getAllUserChats);
router.post("/", controller.accessChat);

router.use("/group", groupRoutes);

export = router;
