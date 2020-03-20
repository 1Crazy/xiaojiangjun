# xiaojiangjun
小将军-小程序UI

# git 基本命令
克隆仓库
>git clone https://github.com/1Crazy/xiaojiangjun.git

查看仓库状态
>git status

将文件全部文件放入暂存区
>git add .

将单个文件放入暂存区
>git add 文件名

提交
>git commit -m "提交消息"

推送至远程仓库(不要推送至**master分支**，创建自己的分支名,并推送)
>git push origin 远程分支名

# 接口设置路径
>/public/utils

# 项目运行环境
1. HBuider X
2. sass插件
3. ES6插件
4. uni-app编译插件

# 接口请求示例
```
/**
*
* url 为接口后缀
* 
**/
Request(url, data, method = 'GET', title = '加载中', baseUrl = dev , dataType = 'json')
.then((res)=>{
    // 成功方法
})
.catch((res)=>{
    // 失败方法
})
```
