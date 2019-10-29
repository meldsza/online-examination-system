const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Student = require('../../models/Student')
const UserToken = require('../../models/UserToken')
module.exports = async (req, res) => {
    if (!req.body.username || !req.body.password) reject(res)
    let fac = await Student.query().where('username', req.body.username)

    if (fac.length == 0) reject(res)
    fac = fac[0]
    if (await bcrypt.compare(req.body.password, fac.password)) {
        jwt.sign({ id: fac.id, type: 'STUDNET' }, process.env.JWT_KET || 'secret', {}, async (err, token) => {
            if (err) { res.status(500); return res.end(err) }
            res.json({ token: token })
            await UserToken.query().insert({ token: token, user_id: fac.id, user_type: "STUDENT" })
        })
    }
    else reject(res)

}
function reject(res) {
    res.status(401)
    res.json({ message: 'Incorrect credentials' })
}