import express from "express";
import UserModels from "../models/UserModels";
import { alreadyProcessed, doProcessEvent } from "../libs/HandleReward";
import md5 from "md5";
import env from "dotenv";

env.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const IronsourceControllers = express.Router();

const model = UserModels;

// create
IronsourceControllers.post(`/ironsource-create`, async (req, res) => {
  try {
    const data = await req.body;

    const create = await model.create({
      data: data,
    });

    res.status(201).json({
      success: true,
      message: "berhasil",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

IronsourceControllers.get("/reward-video", async (req, res) => {
  const userId = req.query.appUserId;
  const eventId = req.query.eventId;
  const rewards = req.query.rewards;
  const signature = req.query.signature;
  const timestamp = req.query.timestamp;
  const token = md5(timestamp + eventId + userId + rewards + PRIVATE_KEY);
  const data = {
    event_id: eventId,
    rewards: rewards,
    signature: signature,
    user_id: userId,
    timestamp: timestamp,
  };

  console.log(req.query);

  // validate the call using the signature
  if (token !== signature) {
    console.log("Signature doesn’t match parameters");

    res
      .status(200)
      .type("application/xml")
      .send("Signature doesn’t match parameters");

    return;
  }

  // const cekEvent = await alreadyProcessed(data);

  // // check that we haven't processed the same event before
  // if (!cekEvent) {
  //   console.log(`event sudah di proses sebelumnya`);

  //   // grant the rewards
  //   return res.send(`event sudah di proses sebelumnya`);
  // }

  doProcessEvent(userId, rewards);

  res.send(`${eventId}:OK:${JSON.stringify(data)}`);
});

// read
IronsourceControllers.get(`/ironsource-read/:uid?`, async (req, res) => {
  try {
    const { uid } = await req.params;
    var result;

    if (uid) {
      const find = await model.findUnique({
        where: {
          unique_id: uid,
        },
      });

      if (!find) {
        res.status(200).json({
          success: false,
          message: "data tidak ditemukan",
        });
        return;
      }

      result = find;
    } else {
      const find = await model.findMany();
      result = find;
    }

    res.status(200).json({
      success: true,
      message: "berhasil",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// update
IronsourceControllers.put(`/ironsource-update/:uid`, async (req, res) => {
  try {
    const { uid } = await req.params;
    const data = await req.body;

    const update = await model.update({
      where: {
        unique_id: uid,
      },
      data: data,
    });

    res.status(200).json({
      success: true,
      message: "berhasil update",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// delete
IronsourceControllers.delete(`/ironsource-delete/:uid`, async (req, res) => {
  try {
    const { uid } = await req.params;

    const hapus = await model.delete({
      where: {
        unique_id: uid,
      },
    });

    res.status(200).json({
      success: true,
      message: "berhasil update",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default IronsourceControllers;
