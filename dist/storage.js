const fs = require('fs'); 
const path = require('path'); 
const os = require('os'); 
const STORAGE_DIR = path.join(os.homedir(), '.click-crab'); 
const COMMANDS_FILE = path.join(STORAGE_DIR, 'commands.json'); 
const PATHS_FILE = path.join(STORAGE_DIR, 'paths.json'); 
function ensureStorageDir() { 
  if (!fs.existsSync(STORAGE_DIR)) fs.mkdirSync(STORAGE_DIR, { recursive: true }); 
} 
function readCommands() { 
  ensureStorageDir(); 
  if (!fs.existsSync(COMMANDS_FILE)) return []; 
  try { return JSON.parse(fs.readFileSync(COMMANDS_FILE, 'utf-8')); } 
  catch (e) { console.error('Error reading commands'); return []; } 
} 
function writeCommands(c) { 
  ensureStorageDir(); 
  fs.writeFileSync(COMMANDS_FILE, JSON.stringify(c, null, 2)); 
} 
function readPaths() { 
  ensureStorageDir(); 
  if (!fs.existsSync(PATHS_FILE)) return []; 
  try { return JSON.parse(fs.readFileSync(PATHS_FILE, 'utf-8')); } 
  catch (e) { console.error('Error reading paths'); return []; } 
} 
function writePaths(p) { 
  ensureStorageDir(); 
  fs.writeFileSync(PATHS_FILE, JSON.stringify(p, null, 2)); 
} 
function getNextId(items) { 
  if (items.length === 0) return 1; 
  return Math.max(...items.map(i => i.id)) + 1; 
} 
module.exports = { 
  pinCommand: (cmd, name) => { 
    const cmds = readCommands(); 
    const newCmd = { id: getNextId(cmds), command: cmd, name, timestamp: new Date().toISOString() }; 
    cmds.push(newCmd); 
    writeCommands(cmds); 
    return newCmd; 
  }, 
  listCommands: readCommands, 
  getCommand: (id) => readCommands().find(c => c.id === id) || null, 
  deleteCommand: (id) => { 
    const cmds = readCommands(); 
    const filtered = cmds.filter(c => c.id !== id); 
    if (filtered.length === cmds.length) return false; 
    writeCommands(filtered); 
    return true; 
  }, 
  clipPath: (p) => { 
    const paths = readPaths(); 
    const newPath = { id: getNextId(paths), path: path.resolve(p), timestamp: new Date().toISOString() }; 
    paths.push(newPath); 
    writePaths(paths); 
    return newPath; 
  }, 
  listPaths: readPaths, 
  getPath: (id) => readPaths().find(p => p.id === id) || null, 
  deletePath: (id) => { 
    const paths = readPaths(); 
    const filtered = paths.filter(p => p.id !== id); 
    if (filtered.length === paths.length) return false; 
    writePaths(filtered); 
    return true; 
  }, 
  getStorageDir: () => STORAGE_DIR 
}; 
