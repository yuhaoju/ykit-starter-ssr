import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

module.exports = function() {
    const child = child_process.spawn(
        'ykit',
        ['s', '-p 12456', '--hot', '--color']
    );

    child.stdout.on('data', (data) => {
        if(data.includes('error')) {
            console.log(`\n${data}`);
        }
    });

    return child;
};
