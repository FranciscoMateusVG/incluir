import { type NextApiRequest, type NextApiResponse } from "next";
import { CheckUserInput } from "~/hooks/userRepo/createUser.types";
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
    const input = CheckUserInput.parse(req.body);
    const user = await prisma.user.create({
      data: { ...input },
    });

    res.status(200).json(user);
  } catch (error: any) {
    const message = error.message || "Something went wrong";
    res.status(400).json({ error: message });
  }
}
