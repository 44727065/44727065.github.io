## 服务器开启关闭
sudo apachectl start
sudo apachectl restart
sudo apachectl stop

Apache默认的根目录在“/Library/WebServer/Documents/”下

修改步骤
1、切换工作目录下：cd /etc/apache2

2、备份文件，只需要执行一次：sudo cp httpd.conf httpd.conf.bak

3、如果操作出现错误！可以使用命令，恢复备份的 httpd.conf 文件：sudo cp httpd.conf.bak httpd.conf

4、用vim编辑httpd.conf文件，httpd.conf文件时Apache的配置文件：sudo vim httpd.conf
5、按住shift键，并且输入“ ：”号进入vim命令模式，搜索/DocumentRoot，找到图中对应位置将圈内路径改为之前创建的Sites文件
6、之后找到Options FollowSymLinks：修改为Options Indexes FollowSymLinks，在两个单词间添加一个Indexes单词。
7、接下来查找php，:/php，定位到图中位置：
8、将这句代码前面的＃去掉。最后:wq保存并退出。

9、切换工作目录：cd /etc

10、拷贝php.ini文件：sudo cp php.ini.default php.ini

重新启动apache服务器

在终端输入：sudo apachectl -k restart

这个时候如果在浏览器地址输入“http://127.0.0.1/”，就会将Sites文件夹中的目录列出来了。同一工作组里的电脑可以通过本电脑的ip地址来访问本电脑上的文件。
