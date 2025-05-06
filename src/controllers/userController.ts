import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../models";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name, email, password: hashedPassword});
    
    const token = jwt.sign({id: user.id, email: user.email, name: user.name}, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(201).json({message: "User registered successfully", token});
  } catch (error: unknown) {
    res.status(500).json({message: "Error registering user: ", error: (error as Error).message});
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({message: "Invalid credentials"});
      return;
    }

    const token = jwt.sign({id: user.id, email: user.email, name: user.name}, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({message: "Login successful", token});
  } catch (error: unknown) {
    res.status(500).json({message: "Error logging in: ", error: (error as Error).message});
  }
};
