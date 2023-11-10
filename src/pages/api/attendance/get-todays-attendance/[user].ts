import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.query;
  const { user, date } = query;

  // Check the request method
  if (req.method === "GET") {
    try {
      // Parse the date string to a Date object
      const parsedDate = new Date(date as string);

      // Set the start and end dates
      const startDate = new Date(parsedDate.setHours(0, 0, 0, 0));
      const endDate = new Date(parsedDate.setHours(23, 59, 59, 999));

      // Gets today attendance
      const attendance = await prisma.attendance.findMany({
        where: {
          userId: user as string,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      res.status(200).json(attendance);
    } catch (error: any) {
      console.log(error);
      const message = error.message || "Something went wrong";
      res.status(400).json({ error: message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
