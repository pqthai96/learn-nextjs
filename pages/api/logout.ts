import type {NextApiRequest, NextApiResponse} from "next";
import Cookies from "cookies";

type Data = {
  message: string
}

// No parse body when call api
export const config = {
  api: {
    bodyParser: false
  }
}

// Create Proxy Server
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (req.method !== 'POST') {
    return res.status(404).json({message: 'method not supported!'})
  }

  const cookies = new Cookies(req, res);
  cookies.set('accessToken');

  res.status(200).json({message: "Logout Successfully!"});
}