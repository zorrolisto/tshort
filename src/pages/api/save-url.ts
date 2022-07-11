import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { slug, url },
  } = req;

  if (!slug || typeof slug !== "string") {
    res.status(404).json({ message: "pls use slug as string" });
    return;
  }

  await prisma.shortLink.create({
    data: { slug, url },
  });

  res.status(200).json({ ok: true });
};
