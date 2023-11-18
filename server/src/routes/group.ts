import "module-alias/register";
import { authorize } from "@/middleware/auth";
import controller from "@/controllers/chat";
import express from "express";

const router = express.Router();

router.post("/", controller.createGroupChat);
router.put("/rename", controller.renameGroupChat);
router.put("/add", controller.addUserToGroupChat);
router.put("/remove", controller.removeUserFromGroupChat);

export = router;
