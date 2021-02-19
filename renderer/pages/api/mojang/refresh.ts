import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = `https://authserver.mojang.com/refresh`;
  const {
    body: { accessToken, clientToken },
  } = req;

  await axios
    .post(url, {
      accessToken,
      clientToken,
      requestUser: true,
    })
    .then(({ data }) => {
      return res.status(200).json({ data });
    })
    .catch((error) => {
      const { response } = error;
      return res.status(400).json(response.data);
    });
};
