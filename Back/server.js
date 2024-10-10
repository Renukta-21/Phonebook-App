require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Succesful connection'))

const contactScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    }
})

const Contact = mongoose.model('Contact', contactScheme)

app.use(cors())
app.use(express.json())

let contactsList = [
    { id: 1, name: "Alice Johnson", number: "123-456-7890" },
    { id: 2, name: "Bob Smith", number: "234-567-8901" },
    { id: 3, name: "Charlie Brown", number: "345-678-9012" },
    { id: 4, name: "David Wilson", number: "456-789-0123" },
    { id: 5, name: "Eva Green", number: "567-890-1234" },
    { id: 6, name: "Frank White", number: "678-901-2345" },
    { id: 7, name: "Grace Lee", number: "789-012-3456" },
    { id: 8, name: "Hank Miller", number: "890-123-4567" },
    { id: 9, name: "Ivy Davis", number: "901-234-5678" },
    { id: 10, name: "Jack Thompson", number: "012-345-6789" }
  ];
  
/*   contactsList.forEach(contact=>{
    const newContact = new Contact({
        name:contact.name,
        number:contact.number,
    })
    newContact.save()
    .then(saved=>{
        console.log(`Contact ${contact.name} was saved`)
    })
    .catch(err=>{
        console.log(`There was en error saving ${contact.name} ${err}`)
    })
  }) */

/* Contact.deleteMany({})
.then(()=>{
    console.log('Contacts deleted')
}) */
const welcomeText = 
`<h1>Phonebook backend</h1>
<p>Access <b>/contacts    </b> for full list</p>
<p>Access <b>/contacts/:id</b> for specific contact</p>`

app.get('/', (req, res)=>{
    res.send(welcomeText)
})

app.get('/contacts', (req, res)=>{
    Contact.find({})
    .then(data=>res.send(data))
    .catch(err=> {
        console.log('There was en error on get /contacts: '+ err)
        res.status(500).send({err:'Error retrieving contacts'})
    })
})

app.get('/contacts/:id', (req, res) => {
    const { id } = req.params; // Obtén el id de los parámetros de la solicitud
    const foundElm = contactsList.find(c=> c.id==id)
    if(foundElm){
        res.send(foundElm);
    }else{
        res.status(404).send({error: 'Contact not found'})
    }
});

app.delete(`/contacts/:id`, (req, res)=>{
    const {id} = req.params
    const deleteID = Number(id)
    const contactExists = contactsList.some(c=> c.id === deleteID)

    if(contactExists){
        contactsList = contactsList.filter(c=> c.id !== Number(id))
        console.log('Contact deleted succesfully')
        res.status(204).end()
    }else{
        res.status(404).send({error: 'contact not found'})
    }
})
app.post('/contacts', (req, res)=>{
    const newElement = req.body
    contactsList = [...contactsList, newElement]
    res.status(201).end()
})
app.put('/contacts/:id', (req,res)=>{
    const {id} = req.params
    const body = req.body
    contactsList = contactsList.map(c=> c.id!==Number(id) ? c : body) 
    console.log(body)
    res.status(200).send(body)
})
app.listen(3001,()=>
console.log('server started on 3001'))