const path = require('path');
const fs = require('fs');

module.exports = {
    async saveFile(ctx) {
        const file = ctx.request.body.files.file;
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream('./public/' + file.name);
        await reader.pipe(stream);
        console.log('uploading %s -> %s', file.name, stream.path);
    }
};
