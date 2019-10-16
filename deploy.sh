#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
vuepress build

# 进入生成的文件夹
cd ./.vuepress/dist


git init
git add -A
git commit -m 'deploy'

# 发布到 https://github.com/imrige/blog.git
git push -f https://github.com/imrige/blog.git master:gh-pages

open https://imrige.github.io/blog/

cd -
