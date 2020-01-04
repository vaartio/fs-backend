const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id))
  if (person) {
    res.json(person)
  }
  else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id))
  if (person) {
    persons = persons.filter(p => p.id !== Number(req.params.id))
    res.status(204).end()
  }
  else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (!req.body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  if (!!persons.find(p => p.name.toLowerCase() === req.body.name.toLowerCase())) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: getRandomInt(10000000),
    name: req.body.name,
    number: req.body.number
  }

  persons.push(person)
  res.json(person)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
