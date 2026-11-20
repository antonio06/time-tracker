// Runs "vitest run" with the drive letter of the cwd normalized to uppercase.
// On Windows, when the shell starts with a lowercase drive letter (d:\...), Vitest
// loads its modules twice and every suite fails with
// "Cannot read properties of undefined (reading 'config')".
import { spawnSync } from 'node:child_process';

const cwd = process.cwd().replace(/^[a-z]:/, (drive) => drive.toUpperCase());

const quote = (arg) => (/\s/.test(arg) ? `"${arg}"` : arg);
const command = ['npx', 'vitest', 'run', ...process.argv.slice(2).map(quote)].join(' ');

const result = spawnSync(command, { shell: true, stdio: 'inherit', cwd });

process.exit(result.status ?? 1);
