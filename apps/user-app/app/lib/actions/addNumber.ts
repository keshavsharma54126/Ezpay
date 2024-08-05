"use server";

import db from "@repo/db/client";

export default async function addNumber(userId: number, number: string) {
  //@ts-ignore
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        number: number,
      },
    });
    return {
      message: "phone number added",
    };
  } catch (e) {
    console.log("error ", e);
  }
}
