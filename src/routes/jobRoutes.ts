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
router.get("/:id", authenticateToken, getJobById);
router.patch("/:id", authenticateToken, updateJob);
router.delete("/:id", authenticateToken, deleteJob);

export default router;
