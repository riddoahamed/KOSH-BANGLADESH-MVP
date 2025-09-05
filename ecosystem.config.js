module.exports = {
  apps: [{
    name: 'kosh-bangladesh-showcase',
    script: 'simple-server.js',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
};
