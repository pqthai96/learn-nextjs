import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from 'http-proxy';

// No parse body when call api
export const config = {
  api: {
    bodyParser: false
  }
}

// Create Proxy Server
const proxy = httpProxy.createProxyServer();
export default function Handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // Don't send cookies to API Server
  req.headers.cookie = '';

  proxy.web(req, res, {
    target: process.env.API_URL,
    changeOrigin: true,
    selfHandleResponse: false
  })
}