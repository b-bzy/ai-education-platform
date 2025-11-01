# 部署指南

## 概述
本项目包含前端（Next.js）和后端（NestJS），需要分别部署或使用一体化方案。

## 部署方案推荐

### 方案A：免费快速部署（推荐新手）
- **前端**: Vercel（Next.js 官方推荐，免费）
- **后端**: Railway / Render（免费额度）
- **数据库**: Supabase / Railway PostgreSQL（免费层）

### 方案B：一体化部署
- **全栈**: Railway / Render（一个平台部署前后端）
- **数据库**: 平台内置 PostgreSQL

### 方案C：云服务商
- **阿里云** / **腾讯云** / **AWS** / **Google Cloud**
- 需要服务器（ECS/EC2）+ RDS 数据库

---

## 方案A：Vercel + Railway 部署（详细步骤）

### 前置准备
1. 注册账号：
   - Vercel: https://vercel.com（可用 GitHub 登录）
   - Railway: https://railway.app（可用 GitHub 登录）

2. 代码准备：
   - 将代码推送到 GitHub 仓库

---

### 步骤1：配置数据库（迁移内存数据到真实数据库）

#### 1.1 安装 PostgreSQL 依赖
```bash
cd api
npm install @nestjs/typeorm typeorm pg
npm install -D @types/pg
```

#### 1.2 创建数据库配置
创建 `api/src/database.module.ts`:
```typescript
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://localhost:5432/edu_platform',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', // 生产环境设为 false
    }),
  ],
})
export class DatabaseModule {}
```

---

### 步骤2：部署后端到 Railway

#### 2.1 创建 Railway 项目
1. 登录 Railway，点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择你的仓库，选择 `api` 目录作为根目录

#### 2.2 配置环境变量
在 Railway 项目设置中添加：
```
NODE_ENV=production
PORT=3002
DATABASE_URL=<Railway 会自动提供 PostgreSQL 连接串>
```

#### 2.3 配置构建命令
Railway 会自动检测 `package.json`，确保有：
```json
{
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "start": "node dist/main.js"
  }
}
```

#### 2.4 获取后端 URL
部署成功后，Railway 会提供一个公开 URL，例如：`https://api-xxx.railway.app`

---

### 步骤3：部署前端到 Vercel

#### 3.1 创建 Vercel 项目
1. 登录 Vercel，点击 "Add New Project"
2. 导入 GitHub 仓库
3. 配置：
   - **Framework Preset**: Next.js
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### 3.2 配置环境变量
在 Vercel 项目设置中添加：
```
NEXT_PUBLIC_API_URL=https://api-xxx.railway.app/api
```

#### 3.3 更新前端 API 地址
在 `web/src/app/discover/page.tsx` 等文件中，将：
```typescript
const API_BASE = 'http://localhost:3002/api'
```
改为：
```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api'
```

#### 3.4 部署
点击 "Deploy"，Vercel 会自动构建并部署。

---

### 步骤4：配置 CORS（后端）

在 `api/src/main.ts` 中更新 CORS 设置：
```typescript
app.enableCors({
  origin: [
    'http://localhost:3001',
    process.env.FRONTEND_URL, // 添加你的 Vercel 域名
  ],
  credentials: true
})
```

重新部署后端。

---

## 方案B：使用 Docker 部署到云服务器

### 前置准备
- 一台云服务器（阿里云/腾讯云/AWS EC2）
- 已安装 Docker 和 Docker Compose

### 步骤

#### 1. 创建 Dockerfile（后端）
创建 `api/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3002
CMD ["node", "dist/main.js"]
```

#### 2. 创建 Dockerfile（前端）
创建 `web/Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

#### 3. 创建 docker-compose.yml
在项目根目录创建：
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: edu_platform
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: ./api
    ports:
      - "3002:3002"
    environment:
      DATABASE_URL: postgresql://postgres:your_password@postgres:5432/edu_platform
      PORT: 3002
    depends_on:
      - postgres

  web:
    build: ./web
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://your-domain.com:3002/api
    depends_on:
      - api

volumes:
  postgres_data:
```

#### 4. 部署命令
```bash
docker-compose up -d
```

---

## 快速部署检查清单

### 部署前检查
- [ ] 代码已推送到 GitHub
- [ ] 环境变量已配置
- [ ] 数据库连接已配置（如使用）
- [ ] CORS 已配置允许前端域名
- [ ] 前后端 API 地址已更新

### 部署后检查
- [ ] 前端可以访问
- [ ] 后端健康检查 `/api/health` 正常
- [ ] 前端可以调用后端 API
- [ ] 数据可以正常读写（如已配置数据库）

---

## 推荐免费平台对比

| 平台 | 前端 | 后端 | 数据库 | 免费额度 |
|------|------|------|--------|----------|
| Vercel | ✅ | ❌ | ❌ | 无限（个人） |
| Railway | ✅ | ✅ | ✅ | $5/月额度 |
| Render | ✅ | ✅ | ✅ | 有免费层 |
| Netlify | ✅ | ❌ | ❌ | 100GB 带宽/月 |

---

## 下一步：购买域名和 HTTPS

1. **购买域名**: Namecheap / GoDaddy / 阿里云
2. **配置 DNS**: 指向 Vercel / Railway 提供的 IP/CNAME
3. **HTTPS**: Vercel/Railway 自动提供 SSL 证书

---

## 需要帮助？

如果遇到问题，检查：
1. 后端日志（Railway/Render 控制台）
2. 前端构建日志（Vercel 控制台）
3. 浏览器控制台错误
4. 网络请求（Network 面板）

