const fs = require('fs');
const archiver = require('archiver');
const output = fs.createWriteStream(`glitch_release_${+new Date()}.zip`);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

output.on('close', () => {
    // eslint-disable-next-line no-console
    console.log(`${archive.pointer()} total bytes`);
    // eslint-disable-next-line no-console
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', () => {
    // eslint-disable-next-line no-console
    console.log('Data has been drained');
});

archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        // log warning
        // eslint-disable-next-line no-console
        console.warn(err);
    } else {
        // throw error
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);

archive.directory('build/', 'build');
archive.directory('server/', 'server');
archive.file('package-lock.json', { name: 'package-lock.json' });
archive.file('package.json', { name: 'package.json' });
archive.file('ecosystem.config.js', { name: 'ecosystem.config.js' });
archive.file('utils/wget.js', { name: 'utils/wget.js' });

archive.finalize();