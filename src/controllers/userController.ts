import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name, email, password: hashedPassword});

    res.status(201).json({message: "User registered successfully", user});
  } catch (error) {
    res.status(500).json({message: "Error registering user"});
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

    const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({message: "Login successful", token});
  } catch (error) {
    res.status(500).json({message: "Error logging in"});
  }
};
