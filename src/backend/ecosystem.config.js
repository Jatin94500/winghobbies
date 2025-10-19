module.exports = {
  apps: [{
    name: 'wing-hobbies-backend',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    merge_logs: true,
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
