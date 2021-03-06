const { query } = require('./connect')

let createTable = function (sql) {
  return query(sql, [])
}

let findDataById = function (table, id) {
  let _sql = "SELECT * FROM ?? WHERE id = ? "
  return query(_sql, [table, id])
}

let findListByItem = function (table, item) {
  let _sql = "SELECT * FROM ?? WHERE ? "
  return query(_sql, [table, item])
}

let findDataByUserid = function (table, userid,sortField) {
  let _sql = "SELECT * FROM ?? WHERE userid = ? order by ?? asc,createtime desc"
  return query(_sql, [table, userid, sortField])
}

let findDataByPage = function (table, userid, sortField, start, end) {
  let _sql = "SELECT * FROM ?? where userid=? order by ?? asc,createtime desc LIMIT ? , ?"
  return query(_sql, [table, userid, sortField, start, end])
}

let insertMultipleData = function (table, fileds, values) {
  let _sql = "INSERT INTO ?? (??) VALUES ?"
  return query(_sql, [table, fileds, values])
}

let insertOrUpdateMultipleData = function (table, fileds, values) {
  let _sql = "INSERT INTO ?? (??) VALUES ? on duplicate key "
    + "update userid = values(userid),discountname = values(discountname),discountprice = values(discountprice),discountoriginalprice = values(discountoriginalprice),"
    + "discountexpirydate = values(discountexpirydate),discountcategory = values(discountcategory),createtime = values(createtime);"
  return query(_sql, [table, fileds, values])
}

let insertData = function (table, values) {
  let _sql = "INSERT INTO ?? SET ?"
  return query(_sql, [table, values])
}

let updateData = function (table, values, id) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?"
  return query(_sql, [table, values, id])
}


let deleteDataById = function (table, ids, userid) {
  let _sql = "DELETE FROM ?? WHERE id in (?) and userid=?"
  return query(_sql, [table, ids, userid])
}

let deleteDataByUserid = function (table, userid) {
  let _sql = "DELETE FROM ?? WHERE userid = ?"
  return query(_sql, [table, userid])
}

let select = function (table, keys) {
  let _sql = "SELECT ?? FROM ?? "
  return query(_sql, [keys, table])
}

let count = function (table) {
  let _sql = "SELECT COUNT(*) AS total_count FROM ?? "
  return query(_sql, [table])
}

module.exports = {
  createTable,
  findDataById,
  findDataByUserid,
  findDataByPage,
  findListByItem,
  deleteDataById,
  deleteDataByUserid,
  insertData,
  insertMultipleData,
  insertOrUpdateMultipleData,
  updateData,
  select,
  count
}