const fs = require('fs')


async function addLog(req, res) {
    fs.writeFile("user-log.txt", req.url)
    console.log("request logged")
}


module.exports = {
    addLog
}