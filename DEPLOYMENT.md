# BD-SOP Deployment Guide

## Quick Manual Deployment (Immediate Solution)

SSH into your server and run:
```bash
cd /path/to/BD-Bible-Policy
git pull origin main
cd frontend
npm install
npm run build
# Restart your server (use one of these):
pm2 restart bd-sop-frontend  # if using PM2
# OR
sudo systemctl restart your-service  # if using systemd
# OR
pkill node && npm start &  # basic restart
```

## Option 1: GitHub Actions (Automatic Deployment)

### Setup Steps:

1. **Go to your GitHub repository settings**
   - Navigate to: https://github.com/MDKPhotography/BD-Bible-Policy/settings/secrets/actions

2. **Add these secrets:**
   - `SERVER_HOST`: Your server's IP address or domain
   - `SERVER_USER`: Your SSH username
   - `SERVER_PORT`: SSH port (usually 22)
   - `SERVER_SSH_KEY`: Your private SSH key (copy entire content)

3. **Update the workflow file**
   - Edit `.github/workflows/deploy.yml`
   - Change `/path/to/BD-Bible-Policy` to your actual server path

4. **Push changes**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add automated deployment"
   git push origin main
   ```

Now every push to `main` will automatically deploy!

## Option 2: PM2 Deployment (From Local Machine)

### Initial Setup (One Time):

1. **Install PM2 on your server:**
   ```bash
   npm install -g pm2
   ```

2. **Edit `ecosystem.config.js`:**
   - Replace `YOUR_SERVER_USER` with your username
   - Replace `YOUR_SERVER_IP` with your server IP
   - Update the path to match your server

3. **Setup deployment:**
   ```bash
   pm2 deploy production setup
   ```

4. **Deploy:**
   ```bash
   pm2 deploy production
   ```

### Future Deployments:
```bash
pm2 deploy production update
```

## Option 3: Simple Script (Manual Trigger)

1. **Copy `deploy.sh` to your server:**
   ```bash
   scp deploy.sh user@your-server:/home/user/
   ```

2. **Edit the script on server:**
   ```bash
   nano ~/deploy.sh
   # Update the path: /path/to/BD-Bible-Policy
   ```

3. **Run deployment:**
   ```bash
   ./deploy.sh
   ```

## Option 4: Netlify (Free Hosting for Frontend)

1. **Connect GitHub to Netlify:**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose GitHub and select your repo

2. **Configure build settings:**
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`

3. **Deploy:**
   - Automatic on every push to main!
   - Free hosting with HTTPS

## Recommended: PM2 on Your Server

If you have a VPS/dedicated server, here's the quickest setup:

```bash
# On your server:
npm install -g pm2
cd /path/to/BD-Bible-Policy
pm2 start frontend/npm --name "bd-sop" -- start
pm2 save
pm2 startup
```

## Need Help?

- Check deployment logs: `pm2 logs bd-sop`
- Check git status: `git status`
- Verify Node version: `node --version` (should be 14+)
- Check port availability: `lsof -i :3000`

## Security Notes

- Never commit `.env` files with secrets
- Use environment variables for sensitive data
- Keep your server packages updated
- Use HTTPS in production (consider Nginx proxy)