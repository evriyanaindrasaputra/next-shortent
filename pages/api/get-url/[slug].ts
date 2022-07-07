import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "~/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];
  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "pls use with a slug" }));

    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "slug not found" }));
    return;
  }
  if( data.maxVisit === 0){
    await prisma.shortLink.delete({
      where : {
        id : data.id
      }
    })
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "slug has ron out" }));
    return;
  }
  await prisma.shortLink.update({
    where: {
      id: data.id
    },
    data : {
      maxVisit : data.maxVisit - 1
    },
  });
  return res.json(data);
};
