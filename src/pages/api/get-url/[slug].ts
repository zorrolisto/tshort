import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug },
  } = req;

  if (!slug || typeof slug !== "string") {
    res.status(404).json({ message: "pls use slug as string" });
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: { slug: { equals: slug } },
  });

  if (!data) {
    res.status(404).json({ message: "slug dont found" });
    return;
  }

  res.status(200).json(data);
};