const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Faculty = require('../../models/Faculty')
const UserToken = require('../../models/UserToken')
module.exports = async (req, res) => {
    if (!req.body.username || !req.body.password) reject(res)
    let fac = await Faculty.query().where('username', req.body.username)
    if (!fac) reject(res)
    if (await bcrypt.compare(req.body.password, fac.password)) {
        jwt.sign({ id: fac.id, type: 'FACULTY' }, process.env.JWT_KET || 'secret', {}, async (err, token) => {
            if (err) { res.status(500); return res.end(err) }
            res.json({ token: token })
            await UserToken.query().insert({ token: token, user_id: fac.id, user_type: "FACULTY" })
        })
    }
    else reject(res)

}
function reject(res) {
    res.json({ message: 'Incorrect credentials' })
    res.status(401)
}