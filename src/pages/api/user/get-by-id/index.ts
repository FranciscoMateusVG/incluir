import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const input = req.query.id as string;

  try {
    const user = await prisma.user.findUnique({
      where: { id: input },
    });

    res.status(200).json(user);
  } catch (error: any) {
    const message = error.message || "Something went wrong";
    res.status(400).json({ error: message });
  }
}
