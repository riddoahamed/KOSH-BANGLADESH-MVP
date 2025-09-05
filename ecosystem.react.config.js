module.exports = {
  apps: [{
    name: 'kosh-react-dev',
    script: 'npm',
    args: 'start',
    env: {
      NODE_OPTIONS: '--openssl-legacy-provider',
      PORT: 3000,
      BROWSER: 'none'
    },
    cwd: '/home/user/webapp'
  }]
}
