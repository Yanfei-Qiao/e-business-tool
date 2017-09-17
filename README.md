# e-business-tool
A tool to check if a product is off shelves and download the images of the products.

Now It is only targeted for http://gz.17zwd.com

使用步骤：
1. 下载本代码
2. 确保你电脑上安装了Node.js(下载地址https://nodejs.org/dist/v6.11.3/node-v6.11.3-x64.msi)
3. 在代码解压的文件下中打开命令行，运行npm i安装依赖【可直接双击install.bat完成步骤3】
4. 将需要检测是否下架（或者要下载图片）的商品编号加入links.js文件
5. 运行node index.js，等待执行完毕可以在看到命令行中已列出哪些商品已下架，对应的商品图片在文件夹downImg中【可直接双击run.bat运行】
