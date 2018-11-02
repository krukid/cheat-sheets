//#region resolve promise on event emit

var EventEmitter = require('events')
var ee = new EventEmitter()

var p = new Promise((resolve, reject) => {
    ee.on('foo', () => {
        resolve()
    })
})

;(async () => {

    await p
    console.log('lolz')
})()

;ee.emit('foo')

//#endregion

//