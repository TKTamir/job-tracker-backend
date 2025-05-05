import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  authenticateToken
} from "../controllers/jobController";

const router = express.Router();

router.post("/", authenticateToken, createJob);
router.get("/", authenticateToken, getJobs)
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
