const bcrypt = require('bcryptjs')
const hashPwd = async (rawPwd) => {
    const salt = await bcrypt.genSalt(16);
    return await bcrypt.hash(rawPwd, salt);
}
const comparePwd = async (rawPwd, hashPwd) => { 
    return await bcrypt.compare(rawPwd, hashPwd);
}
module.exports = {
    hashPwd,
    comparePwd
}; 