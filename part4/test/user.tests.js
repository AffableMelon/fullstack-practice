const {test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/users')
const assert = require('node:assert')
const supertest = require('supertest')
const { appendFile } = require('node:fs')

const api = supertest(app)

describe('basic get test', async (req, rep) => {
    const initUsers = [
        {
            username:'ABC123',
            password:'1234@ABCD',
            name:'SomePerson'
        },
        {
            username:'DABC123',
            password:'asdf1234@ABCD',
            name:'SomePer123KKson'
        }

    ]

    beforeEach(async () => {
        await User.deleteMany({})
        for(let user of initUsers){
            let userObj = new User(user)
            await userObj.save()
        }
    })

    test('get from database and check lengths', async () => {
        const users = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)

        assert.strictEqual(users.body.length, initUsers.length)
    })

    test('No password returned', async () => {
        const rep = await api.get('/api/users')

        rep.body.forEach(user => {
            assert.strictEqual(user.hasOwnProperty('password'), false)
        });
    })


})

describe('post tests', async ()=> {
    beforeEach(async ()=> {
        await User.deleteMany({})
    })

    test.only('Posting to db', async() => {
        const user = {
            username:'DABC123',
            password:'asdf1234@ABCD',
            name:'SomePer123KKson'
        }
        const initialState = await api.get('/api/users')
        await api.post('/api/users').send(user).expect(201).expect('Content-Type', /application\/json/)
        const updatedState = await api.get('/api/users')
        console.log(updatedState.body)
        assert.strictEqual(updatedState.body.length, initialState.body.length + 1)

    })
    test('validation test', async () => {
        const badUser = {
            username: '12SS@A',
            password: '',
            name: ''
        }

        const initialState = await api.get('/api/users')
        await api.post('/api/users').send(badUser).expect(400)
        const afterPostState = await api.get('/api/users')

        assert.strictEqual(initialState.body.length, afterPostState.body.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})