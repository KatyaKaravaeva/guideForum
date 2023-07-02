const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { $authHost } = require('./api.service');

const app = express();

app.use('/api', async (req, res) => {
  try {
    const response = await $authHost.get('/user/refresh');
    const accessToken = response.data.accessToken;
    req.headers.authorization = `Bearer ${accessToken}`;

    createProxyMiddleware({
      target: 'http://51.250.120.247:8080',
      changeOrigin: true,
      secure: false,
      headers: {
        Authorization: req.headers.authorization,
      },
    })(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
