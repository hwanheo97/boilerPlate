const { createProxyMiddleware } = require('http-proxy-middleware');
//proxy로 대체 가능 <= { createProxyMiddleware }
module.exports = function(app) {
   
  app.use(
    '/api',
    createProxyMiddleware({
     //proxy로 대체 가능 <= { createProxyMiddleware }
    //target: 'http://localhost:5000',    //local
   target: 'https//localhost/process.env.PORT || 5000',
  //  target: 'http://3.139.239.112/process.env.PORT || 5000',    //deploy aws okay
   //target: 'https://benplate.herokuapp.com/process.env.PORT || 5000',
      changeOrigin: true,
      
    })
  );
};
