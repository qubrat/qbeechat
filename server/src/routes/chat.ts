import "module-alias/register";
import express from "express";
import controller from "@/controllers/chat";
import groupRoutes from "@/routes/group";
import { authorize } from "@/middleware/auth";

const router = express.Router();

router.use(authorize);
router.get("/", controller.getAllUserChats);
router.post("/", controller.accessChat);

router.use("/group", groupRoutes);

export = router;
