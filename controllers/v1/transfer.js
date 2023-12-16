const express = require('express')
// const model = require('../../models/account.js')
const router = express.Router()
// const Transfer = model.Tccount

// http://localhost:3000/v1/transfer
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'success!!' })
})

// 送金先の情報を取得
router.get('/:fromAccountID', (req, res, next) => {
  ;(async () => {
    try {
      const { fromAccountID } = req.params
      // 送金元口座の情報を取得
      const fromAccountResponse = await fetch('http://accounts:3000/v1/accounts/' + fromAccountID)
      const fromAccount = await fromAccountResponse.json()
      if (fromAccount) {
        // console.log(fromAccount)
        return res.status(200).json(fromAccount)
      } else {
        return res.status(404).json({ error: 'NotFound' })
      }
    } catch (err) {
      console.error(err)
      return res.status(400).json({ error: 'BadRequest' })
    }
  })().catch(next)
})

// 送金APIのエンドポイント
router.post('/', (req, res, next) => {
  ;(async () => {
    try {
      // TODO: 送金の正しいリクエストを送る
      const { fromAccountID, toAccountID, amount } = req.body
      console.log('fromAccountID:', fromAccountID)
      console.log('toAccountID:', toAccountID)
      console.log('amount:', amount)

      // リクエストボディの値が存在するかをチェック
      if (!fromAccountID || !toAccountID || amount === undefined) {
        return res.status(400).json({ error: '不足しているリクエストパラメータがあります' })
      }

      // 送金元口座の情報を取得
      const fromAccountResponse = await fetch('http://accounts:3000/v1/accounts/' + fromAccountID)
      const fromAccount = await fromAccountResponse.json()
      // console.log(fromAccount)
      if (fromAccountResponse.status === 404) {
        return res.status(404).json({ error: 'NotFound' })
      }
      // fromAccountが空の場合（これは通常発生しないが、念のためのチェック）
      if (!fromAccount) {
        return res.status(404).json({ error: 'NotFound' })
      }

      // 送金先口座の情報を取得
      const toAccountResponse = await fetch('http://accounts:3000/v1/accounts/' + toAccountID)
      const toAccount = await toAccountResponse.json()
      if (toAccountResponse.status === 404) {
        return res.status(404).json({ error: 'NotFound' })
      }
      // fromAccountが空の場合（これは通常発生しないが、念のためのチェック）
      if (!toAccount) {
        return res.status(404).json({ error: 'NotFound' })
      }

      // 送金元口座の残高をチェック
      if (fromAccount.balance < amount) {
        return res.status(400).json({ error: '残高不足です' })
      }

      // 送金元口座の残高を更新
      fromAccount.balance -= amount
      const fromAccountUpdateResponse = await fetch('http://accounts:3000/v1/accounts/' + fromAccountID, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fromAccount)
      })
      // レスポンスのステータスコードをチェック
      if (!fromAccountUpdateResponse.ok) {
        // レスポンスが成功でない場合、エラーを返す
        return res.status(fromAccountUpdateResponse.status).json({ error: '送金元口座の更新に失敗しました' })
      }

      // 送金先口座の残高を更新
      toAccount.balance += amount
      const toAccountUpdateResponse = await fetch('http://accounts:3000/v1/accounts/' + toAccountID, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toAccount)
      })
      // レスポンスのステータスコードをチェック
      if (!toAccountUpdateResponse.ok) {
        // レスポンスが成功でない場合、エラーを返す
        return res.status(toAccountUpdateResponse.status).json({ error: '送金先口座の更新に失敗しました' })
      }

      return res.status(200).json({ message: 'success!!' })
    } catch (err) {
      console.error(err)
      return res.status(400).json({ error: 'BadRequest' })
    }
  })().catch(next)
})

module.exports = router
