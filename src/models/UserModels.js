import { PrismaClient } from "@prisma/client";

const UserModels = new PrismaClient().user_data;

export default UserModels;
