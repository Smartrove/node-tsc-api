import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random, authentication } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    //if user fail to provide credentials
    if (!email || !password || !username) {
      res.json({ msg: "input cannot be empty" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.json({ msg: "user already exists" });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};
