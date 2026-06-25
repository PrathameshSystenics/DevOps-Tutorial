import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";

// GET /api/users - list all users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// GET /api/users/:id - get a single user
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

// POST /api/users - create a user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "name, email and phone are required" });
      return;
    }
    const user = await prisma.user.create({ data: { name, email, phone } });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      res.status(409).json({ message: "A user with this email already exists" });
      return;
    }
    res.status(500).json({ message: "Failed to create user", error });
  }
};

// PUT /api/users/:id - update a user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, email, phone },
    });
    res.json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({ message: "User not found" });
        return;
      }
      if (error.code === "P2002") {
        res.status(409).json({ message: "A user with this email already exists" });
        return;
      }
    }
    res.status(500).json({ message: "Failed to update user", error });
  }
};

// DELETE /api/users/:id - delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(500).json({ message: "Failed to delete user", error });
  }
};
