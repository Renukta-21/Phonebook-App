const contactsRouter = require('express').Router()
const Contact = require('../models/contact')
const base = '/contacts'

const welcomeText = `<h1>Phonebook backend</h1>
<p>Access <b>/contacts    </b> for full list</p>
<p>Access <b>/contacts/:id</b> for specific contact</p>`

contactsRouter.get('/', (req, res) => {
  res.send(welcomeText)
})

contactsRouter.get(`${base}`, (req, res) => {
  Contact.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      console.log('There was en error on get /contacts: ' + err)
      res.status(500).send({ err: 'Error retrieving contacts' })
    })
})

contactsRouter.get(`${base}/:id`, (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        return res.send(contact)
      }
      res.status(404).send({ err: 'Contact not found' })
    })
    .catch((err) => next(err))
})

contactsRouter.delete(`${base}/:id`, (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(202).end()
    })

    .catch((err) => next(err))
})
contactsRouter.post(`${base}`, (req, res, next) => {
  const newElement = req.body
  if (newElement && newElement.name && newElement.number) {
    const newContact = new Contact(newElement)
    newContact
      .save()
      .then((data) => {
        console.log(`${data} was saved`)
        res.status(201).send(data)
      })
      .catch((err) => next(err))
  } else {
    res.status(400).send({ error: 'Content missing in POST' })
  }
})
contactsRouter.put(`${base}/:id`, (req, res, next) => {
  const updatedNote = req.body
  console.log(req.body)
  Contact.findByIdAndUpdate(req.params.id, updatedNote, { new: true })
    .then((updContact) => {
      if (updContact) {
        return res.send(updContact)
      }
      return res.status(404).send({ error: "Contact doesn't exist" })
    })
    .catch((err) => next(err))
})

module.exports = contactsRouter
