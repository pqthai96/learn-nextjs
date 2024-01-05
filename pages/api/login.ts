import type {NextApiRequest, NextApiResponse} from "next";
import httpProxy, {ProxyResCallback} from 'http-proxy';
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

  if (req.method !== 'POST') {
    return res.status(404).json({message: 'method not supported!'})
  }

  return new Promise((resolve) => {
    // Don't send cookies to API Server
    req.headers.cookie = '';

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';

      proxyRes.on("data", function (chunk) {
        body += chunk
      })

      proxyRes.on("end", function () {
        try {
          const {accessToken, expiredAt} = JSON.parse(body);

          // Convert token to cookies
          const cookies = new Cookies(req, res, {secure: process.env.NODE_ENV !== 'development'});
          cookies.set('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt)
          });

          // res.end("my response to cli");
          (res as NextApiResponse).status(200).json({message: "Login successfully!"})
        } catch (e) {
          (res as NextApiResponse).status(500).json({message: "Something went wrong..."})
        }

        resolve(true);
      })
    }

    proxy.once('proxyRes', handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      selfHandleResponse: true
    })
  })
}