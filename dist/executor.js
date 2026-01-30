const { spawn } = require('child_process'); 
module.exports = { 
  executeCommand: (cmd) => new Promise((resolve, reject) => { 
    const shell = process.platform === 'win32' ? 'cmd.exe' : '/bin/sh'; 
    const flag = process.platform === 'win32' ? '/c' : '-c'; 
    const child = spawn(shell, [flag, cmd], { stdio: 'inherit', cwd: process.cwd() }); 
    child.on('error', reject); 
    child.on('close', (code) => resolve(code || 0)); 
  }) 
}; 
