const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view-engine', 'hbs')

app.use((request, response, next) => {
  const now = new Date().toString()
  const log = `${now}: ${request.method}  ${request.url}`

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// app.use((request, response, next) => {
//   response.render('maintenence.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('capitalise', (text) => {
  return text.toUpperCase()
})

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle : 'Home',
    welcomeMessage : "Hi Welcome to my webpage"
  })
})

app.get('/about', (request, response) => {
  response.render('about.hbs' , {
    pageTitle : 'About',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "ERROR HANDLING REQUEST"
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
