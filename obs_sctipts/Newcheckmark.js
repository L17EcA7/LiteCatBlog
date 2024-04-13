const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);


function getCreateTimeAsFileName() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var time = year + month + day  + hour + minute + second;
    return time;
}



// execute command function

async function executeCommand() {
    const Type = "checkmark";
    const TypeName = "确认";

    
    const Time = getCreateTimeAsFileName();
    const fileName = Time + ".md";
    const { stdout, stderr } = await exec(`hugo new ${Type}/` + Time + "/index.md", { cwd: app.fileManager.vault.adapter.basePath });
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if (stdout) {
        new Notice(`📌创建新${TypeName}成功 [` + fileName + "]")
    } else {
        new Notice(`❌ 创建新${TypeName}页失败. ` + stderr)
    }
}



module.exports = async function (context, req) {
    await executeCommand();
}