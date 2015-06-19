import express from 'express'
import React from 'react'
import App from '../views/app'

const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Lazooda',
    scripts: [ '/app.js' ],
    styles: [],
    content: React.renderToString(React.createElement(App))
  })
})

export default app