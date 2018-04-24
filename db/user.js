const { query } = require('./connect')

let findUserByAcount = function (userAcount) {
  let _sql = "SELECT * FROM user WHERE useracount = ? "
  return query(_sql, [userAcount])
}

let userLogin = function (userAcount, userpassword) {
  let _sql = "SELECT * FROM user WHERE useracount = ? and userpassword= ?"
  return query(_sql, [userAcount, userpassword])
}


module.exports = {
  findUserByAcount,
  userLogin
}