import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const child = child_process.exec('ykit s -p 12456 --hot', function(err, stdout, stderr) {
    console.log(stdout);
});

child.stdout.on('data', (data) => {
    // console.log(`stdout: ${data}`);
});

// log error
process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});

// exitHandler && catches ctrl+c event
process.on('exit', exitHandler.bind(null));
process.on('SIGINT', exitHandler.bind(null));
function exitHandler() {
    // cleanup
    child && child.kill('SIGINT');
    process.exit(0);
}
