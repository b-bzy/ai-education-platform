# 🚀 快速部署指南 - 让网站上线！

## 📋 5分钟快速部署（最简单方式）

### 步骤1：准备 GitHub 仓库（如果还没有）

```bash
# 在项目根目录执行
git init
git add .
git commit -m "准备部署"
git branch -M main

# 在 GitHub 创建新仓库，然后：
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 步骤2：部署后端到 Railway（免费）

1. **访问 https://railway.app**
   - 用 GitHub 账号登录

2. **创建新项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择你的仓库

3. **配置项目**
   - 点击项目，选择 "Settings"
   - 找到 "Root Directory"，设置为 `api`
   - 点击 "Save"

4. **添加环境变量（可选）**
   - 在 "Variables" 标签页添加：
     ```
     PORT=3002
     NODE_ENV=production
     ```

5. **部署**
   - Railway 会自动开始构建和部署
   - 等待 2-3 分钟，看到 "Deployed" 状态

6. **获取后端地址**
   - 点击 "Settings" → "Networking"
   - 点击 "Generate Domain" 生成一个公开域名
   - **记住这个地址**，例如：`https://api-production-xxx.up.railway.app`
   - **重要：** 在地址后面加上 `/api`，完整地址应该是：`https://api-production-xxx.up.railway.app/api`

### 步骤3：部署前端到 Vercel（免费）

1. **访问 https://vercel.com**
   - 用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库

3. **配置项目**
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `web` ⚠️ **重要！**
   - **Build Command**: `npm run build`（默认）
   - **Output Directory**: `.next`（默认）

4. **添加环境变量**
   - 在 "Environment Variables" 部分
   - 添加变量：
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: 你的 Railway 后端地址（包含 `/api`），例如：
       ```
       https://api-production-xxx.up.railway.app/api
       ```

5. **部署**
   - 点击 "Deploy"
   - 等待 1-2 分钟构建完成

6. **获取前端地址**
   - 部署完成后，Vercel 会给你一个地址
   - 例如：`https://your-app.vercel.app`
   - **这个就是你的网站地址！** 🎉

### 步骤4：配置后端 CORS（重要！）

1. 回到 Railway 项目
2. 在 "Variables" 标签页添加：
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
   （替换为你的 Vercel 前端地址）
3. Railway 会自动重新部署

---

## ✅ 完成！

现在访问你的 Vercel 地址（例如：`https://your-app.vercel.app`），就能看到网站了！

**分享给别人**：直接把 Vercel 的链接发给别人，他们就可以访问了！

---

## 🔧 常见问题

### 问题1：前端显示错误，无法连接后端
- 检查 Vercel 环境变量 `NEXT_PUBLIC_API_URL` 是否正确
- 检查 Railway 后端是否正常运行（访问后端 URL + `/api/health`）

### 问题2：CORS 错误
- 确保在 Railway 添加了 `FRONTEND_URL` 环境变量
- 确保值是完整的 Vercel 地址（包含 `https://`）

### 问题3：数据丢失
- 当前数据存储在内存中，服务重启会丢失
- 如需持久化，需要配置数据库（见 `docs/deployment.md`）

---

## 📝 更新网站

每次代码更新后：
1. 推送到 GitHub：`git push`
2. Vercel 和 Railway 会自动重新部署（约 1-2 分钟）

---

## 🎯 下一步（可选）

- **绑定自定义域名**：在 Vercel 设置中添加你的域名
- **配置数据库**：见 `docs/deployment.md` 获取数据库配置说明
- **添加 HTTPS**：Vercel 和 Railway 自动提供免费 SSL 证书

