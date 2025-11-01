# 推送代码到 GitHub

## 步骤1：创建 Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. 填写：
   - **Note**: 随便写，例如"我的电脑"
   - **Expiration**: 选择过期时间（推荐 90 days）
   - **勾选权限**: 至少勾选 `repo`（全部仓库权限）
4. 点击 **"Generate token"**
5. **立即复制这个 token**（只显示一次！）保存好

## 步骤2：在终端推送代码

打开终端，输入以下命令（一行一行执行）：

```bash
cd /Users/jacob/Desktop/decentralize_education_platform
git push -u origin main
```

### 输入认证信息：

当终端提示：
- **Username**: 输入你的 GitHub 用户名 `b-bzy`
- **Password**: **输入刚才复制的 Personal Access Token**（不是你的登录密码！）

按回车后，等待几秒钟，如果看到类似这样的提示：
```
Enumerating objects: XX, done.
Writing objects: 100% (XX/XX), done.
```

说明代码已经成功上传到 GitHub！

## 步骤3：验证

访问 https://github.com/b-bzy/ai-education-platform 查看你的代码是否已经上传成功。

---

## ✅ 完成！

现在你的代码已经在 GitHub 上了，可以继续部署到网站了！

继续看 `DEPLOY.md` 的第二步：部署后端到 Railway。

