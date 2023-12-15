import "module-alias/register";
import express from "express";
import controller from "@/controllers/users.controllers";
import { authorize } from "@/middleware/auth";

const router = express.Router();

router.use(authorize);
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUser);

export = router;
