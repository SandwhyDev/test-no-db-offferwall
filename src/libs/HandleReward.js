import UserModels from "../models/UserModels";

export const alreadyProcessed = async (data) => {
  const date = await GenerateDate();

  const FindEvent = await EventModel.findUnique({
    where: {
      event_id: data.event_id,
    },
  });

  if (FindEvent) {
    return false;
  }

  const CreateEvent = await EventModel.create({
    data: {
      event_id: data.event_id,
      rewards: +data.rewards,
      signature: data.signature,
      user_id: data.user_id,
      timestamp: data.timestamp,
      processed_at: date,
    },
  });

  return true;
};

// Fungsi doProcessEvent
export const doProcessEvent = async (userId, rewards) => {
  // update reward ke database
  const FindUser = await UserModels.findUnique({
    where: {
      id: +userId,
    },
  });

  if (!FindUser) {
    return false;
  }

  const point = (await +FindUser.point) + +rewards;

  const UpdatePoint = await UserModels.update({
    where: {
      id: FindUser.id,
    },
    data: {
      point: point,
    },
  });

  return UpdatePoint;
};
