import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const child = child_process.exec('ykit s -p 12456 --hot', function(err, stdout, stderr) {
    console.log(stdout);
});

child.stdout.on('data', (data) => {
    // console.log(`stdout: ${data}`);
});
