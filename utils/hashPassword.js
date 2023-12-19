const bcrypt = require('bcryptjs')
const hashPwd = async (rawPwd) => {
    const salt = await bcrypt.genSalt(16);
    return await bcrypt.hash(rawPwd, salt);
}
module.exports = hashPwd;