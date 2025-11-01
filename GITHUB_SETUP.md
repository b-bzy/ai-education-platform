# 📚 详细步骤：将代码上传到 GitHub

## 第一步：初始化 Git 仓库（在本地）

### 1.1 打开终端
- **Mac**: 按 `Command + 空格键`，输入"终端"或"Terminal"，回车
- **Windows**: 按 `Win + R`，输入 `cmd`，回车

### 1.2 进入项目文件夹
在终端中输入以下命令（一行一行执行）：

```bash
cd /Users/jacob/Desktop/decentralize_education_platform
```

按回车，你应该会看到路径已经切换到项目目录。

### 1.3 初始化 Git 仓库
继续输入：

```bash
git init
```

按回车，你会看到类似：`Initialized empty Git repository in /Users/jacob/Desktop/...`

### 1.4 添加所有文件
输入：

```bash
git add .
```

按回车（注意最后的点 `.` 不能少）

### 1.5 提交代码
输入：

```bash
git commit -m "首次提交：AI教育平台项目"
```

按回车

---

## 第二步：在 GitHub 创建仓库（在网页上操作）

### 2.1 登录 GitHub
1. 打开浏览器，访问：https://github.com
2. 如果还没有账号，点击 "Sign up" 注册（免费）
3. 如果已有账号，点击 "Sign in" 登录

### 2.2 创建新仓库
1. 登录后，点击右上角的 **"+"** 号
2. 选择 **"New repository"**（新建仓库）

### 2.3 填写仓库信息
- **Repository name**（仓库名称）: 输入一个名字，例如：`ai-education-platform`
- **Description**（描述）: 可选，例如：`AI少儿教育平台`
- **选择 Public**（公开）或 **Private**（私有）：
  - Public：所有人可以看到代码（推荐，免费）
  - Private：只有你能看到（需要付费账号）
- **⚠️ 重要：不要勾选** "Add a README file"、"Add .gitignore"、"Choose a license"
- 点击绿色的 **"Create repository"** 按钮

### 2.4 记住仓库地址
创建成功后，你会看到一个页面，页面中间有地址，例如：
```
https://github.com/你的用户名/ai-education-platform.git
```

**把这个地址复制下来**，下一步要用。

---

## 第三步：连接本地代码和 GitHub 仓库

### 3.1 添加远程仓库地址
回到终端，输入（把下面的地址替换成你刚才复制的地址）：

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

例如：
```bash
git remote add origin https://github.com/jacob/ai-education-platform.git
```

按回车

### 3.2 重命名分支（可选但推荐）
输入：

```bash
git branch -M main
```

按回车

### 3.3 推送代码到 GitHub
输入：

```bash
git push -u origin main
```

按回车

### 3.4 可能需要登录 GitHub
如果提示输入用户名和密码：
- **用户名**：你的 GitHub 用户名
- **密码**：**不是你的 GitHub 登录密码**，而是 **Personal Access Token（个人访问令牌）**

#### 如何创建 Personal Access Token：
1. 打开 https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. 填写：
   - **Note**: 随便写，例如"我的电脑"
   - **Expiration**: 选择过期时间（推荐 90 days 或 No expiration）
   - **勾选权限**: 至少勾选 `repo`（全部仓库权限）
4. 点击底部的 **"Generate token"**
5. **立即复制这个 token**（只显示一次！），这就是你的密码

把 token 粘贴到终端密码输入框，按回车。

---

## ✅ 完成！

等待几秒钟，如果看到类似这样的提示：
```
Enumerating objects: XX, done.
Writing objects: 100% (XX/XX), done.
```

说明代码已经成功上传到 GitHub！

### 验证：刷新 GitHub 网页
回到浏览器，刷新你的 GitHub 仓库页面，应该能看到所有代码文件了！

---

## ❓ 遇到问题？

### 问题1：提示 "command not found: git"
**解决**：需要先安装 Git
- Mac: 访问 https://git-scm.com/download/mac
- Windows: 访问 https://git-scm.com/download/win

### 问题2：提示 "remote origin already exists"
**解决**：输入以下命令删除旧的，然后重新添加：
```bash
git remote remove origin
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

### 问题3：推送时提示权限错误
**解决**：
- 检查 GitHub 用户名是否正确
- 使用 Personal Access Token 而不是登录密码
- 确保 token 有 `repo` 权限

### 问题4：不知道自己的 GitHub 用户名
**解决**：
- 登录 GitHub，点击右上角头像，用户名就在下拉菜单顶部

---

完成这一步后，继续看 `DEPLOY.md` 的第二步：部署到 Railway！

