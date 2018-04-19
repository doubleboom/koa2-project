const { query } = require('./connect')

let createTable = function( sql ) {
  return query( sql, [] )
}

let findDataById = function( table,  id ) {
  let  _sql =  "SELECT * FROM ?? WHERE id = ? "
  return query( _sql, [ table, id ] )
}

let findDataByUserid = function( table,  userid ) {
  let  _sql =  "SELECT * FROM ?? WHERE userid = ? "
  return query( _sql, [ table, userid ] )
}

let findDataByPage = function( table, userid, start, end ) {
  let  _sql =  "SELECT * FROM ?? where userid=?  LIMIT ? , ?"
  return query( _sql, [table,  userid,  start, end ] )
}


let insertMultipleData = function( table, fileds, values ) {
  let _sql = "INSERT INTO ?? (??) VALUES ?"
  return query( _sql, [ table, fileds , values ] )
}

let insertData = function( table, values ) {
  let _sql = "INSERT INTO ?? SET ?"
  return query( _sql, [ table, values ] )
}

let updateData = function( table, values, id ) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?"
  return query( _sql, [ table, values, id ] )
}


let deleteDataById = function( table, id ) {
  let _sql = "DELETE FROM ?? WHERE id = ?"
  return query( _sql, [ table, id ] )
}

let deleteDataByUserid = function( table, userid ) {
  let _sql = "DELETE FROM ?? WHERE userid = ?"
  return query( _sql, [ table, userid ] )
}

let select = function( table, keys ) {
  let  _sql =  "SELECT ?? FROM ?? "
  return query( _sql, [ keys, table ] )
}

let count = function( table ) {
  let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? "
  return query( _sql, [ table ] )
}

module.exports = {
  createTable,
  findDataById,
  findDataByUserid,
  findDataByPage,
  deleteDataById,
  deleteDataByUserid,
  insertData,
  insertMultipleData,
  updateData,
  select,
  count
}