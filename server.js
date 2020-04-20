

const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production"; //判断是否是开发环境
const app = next({ dev });
const handle = app.getRequestHandler();
//const compression = require("compression");
const port = parseInt(process.env.PORT, 10) || 80;
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyOption = {
  target: "https://ppytest.paipaiyin.cn",
//   pathRewrite: {
//     //"^/api/": "/" // 重写请求，api/解析为/
//   },
  changeOrigoin: true
};

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev) {
      server.use("/api", createProxyMiddleware({ target: 'https://ppytest.paipaiyin.cn', changeOrigin: true }));
    }

    if (!dev) {
      //server.use(compression()); //gzip
    }
    


    server.get("/", (req, res) => app.render(req, res, "/index"));
    server.get("/test1", (req, res) => app.render(req, res, "/test1"));
    server.get("/list", (req, res) => app.render(req, res, "/list"));
    server.get("/list/:id",
      (req, res) => {
        const actualPage = '/list/[content]'  //list文件下面 一定要取名 [content].js 要不然content.js 中取不到返回的id
        const queryParams = { id: req.params.id } 
        app.render(req, res, actualPage, queryParams)
    })
    // server.get("/books", (req, res) => app.render(req, res, "/books"));
    // server.get("/articles", (req, res) => app.render(req, res, "/articles"));
    // server.get("/login", (req, res) => app.render(req, res, "/login"));
    // server.get("/markdown", (req, res) => app.render(req, res, "/markdown"));
    // server.get("/books", (req, res) => app.render(req, res, "/books"));
    // server.get("/write", (req, res) => app.render(req, res, "/write"));
    // server.get("/book/:currentBookId", (req, res) =>
    //   app.render(req, res, "/book/[currentBookId]", { currentBookId: req.params.currentBookId })
    // );
    // server.get("/article/:curArticleId", (req, res) =>
    //   app.render(req, res, "/article/[curArticleId]", { curArticleId: req.params.curArticleId })
    // );
    server.all("*", (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      else console.log(`http start at ===> http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });