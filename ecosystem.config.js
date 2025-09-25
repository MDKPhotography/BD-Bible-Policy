module.exports = {
  apps: [
    {
      name: 'bd-sop-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ],

  deploy: {
    production: {
      user: 'YOUR_SERVER_USER',
      host: 'YOUR_SERVER_IP',
      ref: 'origin/main',
      repo: 'https://github.com/MDKPhotography/BD-Bible-Policy.git',
      path: '/home/YOUR_USER/BD-Bible-Policy',
      'pre-deploy-local': '',
      'post-deploy': 'cd frontend && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};