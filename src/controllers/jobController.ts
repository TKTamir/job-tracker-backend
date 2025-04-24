import {Request, Response} from "express";
import {Job} from "../models";

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({message: "Job created successfully", job});
  } catch (error) {
    res.status(500).json({message: "Error creating job", error});
  }
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({message: "Error fetching jobs", error});
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      res.status(404).json({message: "Job not found"});
      return;
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({message: "Error fetching job", error});
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      res.status(404).json({message: "Job not found"});
      return;
    }

    await job.update(req.body);
    res.json({message: "Job updated successfully", job});
  } catch (error) {
    res.status(500).json({message: "Error updating job", error});
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      res.status(404).json({message: "Job not found"});
      return;
    }

    await job.destroy();
    res.json({message: "Job deleted successfully"});
  } catch (error) {
    res.status(500).json({message: "Error deleting job", error});
  }
};
