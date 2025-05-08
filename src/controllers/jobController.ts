import {Request, Response, NextFunction, RequestHandler} from "express";
import {Job} from "../models";
import jwt, {JwtPayload} from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload | { id: string; email: string; name: string };
}

export const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      res.status(401).json({message: 'Authentication token missing'});
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(401).json({message: 'Token has expired'});
          return;
        }
        res.status(403).json({message: 'Invalid authentication token'});
        return;
      }
      (req as AuthRequest).user = decoded as JwtPayload;
      next();
    });
    
  } catch (error) {
    res.status(500).json({message: 'Authentication error'});
    return;
  }
};


export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.create({...req.body, userId: req.user?.id});
    res.status(201).json({message: "Job created successfully", job});
  } catch (error) {
    res.status(500).json({message: "Error creating job", error});
  }
};

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobs = await Job.findAll({
      where: {userId: req.user?.id},
    });

    if (!jobs) {
      res.status(404).json({message: "No jobs found for the user"});
      return;
    }

    res.json(jobs);
  } catch (error) {
    res.status(500).json({message: "Error fetching jobs", error});
  }
};
export const getJobById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      res.status(404).json({message: "Job not found"});
      return;
    }

    if (job.userId !== req.user?.id) {
      res.status(403).json({message: "Unauthorized to access this job"});
      return;
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({message: "Error fetching job", error});
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      res.status(404).json({message: "Job not found"});
      return;
    }

    if (job.userId !== req.user?.id) {
      res.status(403).json({message: "Unauthorized to update this job"});
      return;
    }

    await job.update(req.body);
    res.json({message: "Job updated successfully", job});
  } catch (error) {
    res.status(500).json({message: "Error updating job", error});
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      res.status(404).json({message: "Job not found"});
      return;
    }

    if (job.userId !== req.user?.id) {
      res.status(403).json({message: "Unauthorized to delete this job"});
      return;
    }

    await job.destroy();
    res.json({message: "Job deleted successfully"});
  } catch (error) {
    res.status(500).json({message: "Error deleting job", error});
  }
};
