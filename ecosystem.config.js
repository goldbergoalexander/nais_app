module.exports = {
  apps : [{
    name: 'REACT_nais_backend',
	cwd: "./backend",
    script: 'server.js',
		exp_backoff_restart_delay: 100,

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },
  {
    name: 'REACT_naiS_frontend',
	cwd :"./client",
    script: 'npm',
    exp_backoff_restart_delay: 100,
	args : 'run start:production',
	 version: "1.0.0",
   
}
   ],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

