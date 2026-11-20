// Claude Code "Stop" hook: when Claude is about to finish its turn,
// run the unit tests if source code has changed. If they fail, block the
// stop (exit 2) and send the failure output to Claude so it fixes it.
import { execSync, spawnSync } from 'node:child_process';

const readStdin = async () => {
	let data = '';
	for await (const chunk of process.stdin) data += chunk;
	return data;
};

const input = JSON.parse((await readStdin()) || '{}');

// Avoid infinite loops: if Claude is already continuing because of this hook
// and still can't fix the tests, let it stop and report to the user.
if (input.stop_hook_active) process.exit(0);

// Only run the tests when there are uncommitted changes in source code
// (not when Claude just answered a question or edited the README).
let changes = '';
try {
	changes = execSync('git status --porcelain --untracked-files=all', { encoding: 'utf8' });
} catch {
	process.exit(0); // not a git repo or git not available: do nothing
}

const hasCodeChanges = changes
	.split('\n')
	.some((line) => /(^|\s|")(src|server-mock\/src)\/.*\.(ts|tsx)"?$/.test(line.trim()));

if (!hasCodeChanges) process.exit(0);

const result = spawnSync('node scripts/run-vitest.mjs', { shell: true, encoding: 'utf8' });

if (result.status === 0) process.exit(0);

const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
const tail = output.split('\n').slice(-40).join('\n');

process.stderr.write(
	`Unit tests are failing (npm run test:run), so the task is not done yet.\n` +
	`Fix the cause in the code. Do not skip, delete or weaken tests.\n\n${tail}\n`,
);
process.exit(2);