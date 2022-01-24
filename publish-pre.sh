# 上传当前目录下所有文件到服务器
# scp -r ./ root@121.4.47.140:/www/wwwroot/study_express

# 使用 rsync --exclude 排除部分文件 将排除后的文件上传到服务器
# '.*' 忽略所有以.开头的隐藏文件
rsync -av --exclude={'.*','.gitignore','publish-pre.sh','node_modules'} ./ root@121.4.47.140:/www/wwwroot/koa2_server
