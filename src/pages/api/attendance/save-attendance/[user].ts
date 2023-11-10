import { type NextApiRequest, type NextApiResponse } from "next";
import { CheckAttendanceInput } from "~/hooks/attendanceRepo/attendanceRepo.types";

import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const input = CheckAttendanceInput.parse(req.body);
    const user = await prisma.attendance.create({
      data: { ...input },
    });

    res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    const message = error.message || "Something went wrong";
    res.status(400).json({ error: message });
  }
}
