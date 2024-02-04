// 引入express模块
const express = require('express');
// 创建express应用
const app = express();
// 定义端口号
const PORT = 3000;

// 提供静态文件，设置public文件夹为静态资源的根目录
app.use(express.static('public'));

// 监听指定端口，启动服务器
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
