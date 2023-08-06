const test = require('ava')
const supertest = require('supertest')
// const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
// const { MongoMemoryServer } = require('mongodb-memory-server')

console.error = () => {}
const router = require('../controllers/v1/transfer.js')
// const model = require('../models/transfer.js')
// const Account = model.Account

// const mongod = new MongoMemoryServer()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/transfer', router)

// const user1Id = new mongoose.Types.ObjectId()
// const user2Id = new mongoose.Types.ObjectId()
// const owner1Id = new mongoose.Types.ObjectId()
// const owner2Id = new mongoose.Types.ObjectId()

// test.before(async () => {
//   await mongod.start()
//   const uri = mongod.getUri()
//   await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
// })

// // テスト用データを作成
// test.beforeEach(async (a) => {
//   const transfer = []
//   transfer.push(
//     await new Account({
//       accountID: user1Id,
//       accountType: 'ordinary',
//       balance: 1000,
//       ownerID: owner1Id
//     }).save()
//   )
//   transfer.push(
//     await new Account({
//       accountID: user2Id,
//       accountType: 'ordinary',
//       balance: 2000,
//       ownerID: owner2Id
//     }).save()
//   )
//   a.context.transfer = transfer
// })

// test.afterEach.always(async () => {
//   await Account.deleteMany().exec()
// })

// GET /v1/transfer
test.serial('get /transfer', async (t) => {
  const res = await supertest(app).get('/transfer')
  t.is(res.status, 200)
  t.deepEqual(res.body, { message: 'success!!' })
})

// // GET /v1/transfer/:accountID
// test.serial('get /transfer/:accountID', async (t) => {
//   const target = t.context.transfer[0]
//   const res = await supertest(app).get(`/transfer/${target.accountID}`)
//   t.is(res.status, 200)
//   t.is(Object.keys(res.body).length, 5)
//   t.is(res.body._id, t.context.transfer[0]._id.toString())
// })

// test.serial('get account not found', async (t) => {
//   const res = await supertest(app).get(`/transfer/${new mongoose.Types.ObjectId()}`)
//   t.is(res.status, 404)
//   t.deepEqual(res.body, { error: 'NotFound' })
// })

// test.serial('get account id is invalid', async (t) => {
//   const res = await supertest(app).get('/transfer/invalid')
//   t.is(res.status, 400)
//   t.deepEqual(res.body, { error: 'BadRequest' })
// })

// test.serial('put account balance', async (t) => {
//   const putData = {
//     accountID: user1Id,
//     accountType: 'ordinary',
//     balance: 9999,
//     ownerID: owner1Id
//   }
//   const res = await supertest(app).put(`/transfer/${putData.accountID}`).send(putData)
//   t.is(res.status, 200)
//   t.is(res.body.balance, putData.balance)
// })

// test.serial('put account id not found', async (t) => {
//   const putData = {
//     accountID: user1Id,
//     accountType: 'ordinary',
//     balance: 9999,
//     ownerID: owner1Id
//   }
//   const res = await supertest(app).put(`/transfer/${new mongoose.Types.ObjectId()}`).send(putData)
//   t.is(res.status, 404)
//   t.deepEqual(res.body, { error: 'NotFound' })
// })

// test.serial('put account id is invalid', async (t) => {
//   const putData = {
//     accountID: user1Id,
//     accountType: 'ordinary',
//     balance: 9999,
//     ownerID: owner1Id
//   }
//   const res = await supertest(app).put('/transfer/invalid').send(putData)
//   t.is(res.status, 400)
//   t.deepEqual(res.body, { error: 'BadRequest' })
// })
