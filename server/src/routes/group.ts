import "module-alias/register";
import { authorize } from "@/middleware/auth";
import controller from "@/controllers/group";
import express from "express";

const router = express.Router();

router.post("/", controller.createGroupChat);
router.put("/rename", controller.renameGroupChat);
router.put("/user/add", controller.addUserToGroupChat);
router.put("/user/remove", controller.removeUserFromGroupChat);

export = router;
