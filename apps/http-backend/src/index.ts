import express from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/schema/client";
import {
  UserSignupSchema,
  SignInSchema,
  RoomNameSchema,
} from "@repo/common/types";

const app = express();
app.use(express.json());

/* ================= SIGNUP ================= */
app.post("/signup", async (req, res) => {
  const parsed = UserSignupSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Invalid inputs" });
    return;
  }

  const { email, password, name } = parsed.data;

  try {
    const user = await prismaClient.user.create({
      data: {
        email,
        password, // ⚠️ hash later
        name,
      },
    });

    const token = jwt.sign(
      { userId: user.id },
      JWT_TOKEN
    );

    res.json({
      message: "User created",
      token,
    });
  } catch (e) {
    res.status(409).json({
      message: "User already exists",
    });
  }
});

/* ================= SIGNIN ================= */
app.post("/signin", async (req, res) => {
  const parsed = SignInSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Invalid inputs" });
    return;
  }

  const { email, password } = parsed.data;

  const user = await prismaClient.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { userId: user.id },
    JWT_TOKEN
  );

  res.json({ token });
});

/* ================= CREATE ROOM ================= */
app.post("/room", middleware, async (req, res) => {
  const parsed = RoomNameSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Invalid room name" });
    return;
  }
  /*@ts-ignore*/
  const userId=req.userId;
   try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsed.data.RoomName,
        adminId:userId
       },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room already exists",
    });
  }
});

app.get("/chats/:roomId",async (req,res)=>{
  const roomId=parseInt(req.params.roomId);
  const messages=await prismaClient.room.findMany({
    where:{
      id:roomId
    },
    orderBy:{
      id:"desc"
    },
    take:50
  });
  res.json({
    messages
  })
})
app.get("/chats/:slug",async (req,res)=>{
  const slug=req.params.slug;
  const room=await prismaClient.room.findFirst({
    where:{
      slug
    },
  });
  res.json({
    room
  })
})

/* ================= START ================= */
app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});
