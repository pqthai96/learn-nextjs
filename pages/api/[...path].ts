import type {NextApiRequest, NextApiResponse} from "next";
import httpProxy from 'http-proxy';
import Cookies from "cookies";

// No parse body when call api
export const config = {
  api: {
    bodyParser: false
  }
}

// Create Proxy Server
const proxy = httpProxy.createProxyServer();
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {

  return new Promise((resolve) => {

    // Convert Cookies to header authorization
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('accessToken')

    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;
    }

    // Don't send cookies to API Server
    req.headers.cookie = '';

    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      selfHandleResponse: false
    })

    proxy.once('proxyRes', () => {
      resolve(true);
    })
  })
}