const xps = require('express')
const morgan = require('morgan')
const cros = require('cors')
const app = xps()
const PORT = process.env.PORT || 8001

//tokens MORGAN
morgan.token('body', (req, rep) => {return(JSON.stringify(req.body))})

app.use(cros({
    origin: "http://127.0.0.1:5173"
}))
app.use(xps.json()) 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) 


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateID = (max, min) => {
    if (max === 0){
        return(0)
    }
    return(Math.random() * (max - min) + min)

}


const getInfo = () => {
    const length = persons.length
    const date = new Date()

    return([date.toString(), length])
}



app.get('/', (req, rep) => {
    rep.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, rep) => {
    rep.json(persons)
})

app.get('/api/info', (req, rep) => {
    [date, length] = getInfo()

    rep.send(`<div> <p>phonebook has entries for ${length} people</p> <br/> <p>${date}</p></div>`
    )

})

app.get('/api/persons/:id', (req, rep) =>{
    const id = req.params.id
    const person = persons.find(p => p.id === id)

    if(person){
        rep.json(person)
    }else{
        rep.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, rep) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => { return(person.id !== id)})
    console.log(persons)

    rep.status(204).end()
})

app.post('/api/persons/', (req, rep) => {
    const person = req.body
    if ((person.name) && (person.number) ){
        if(!(persons.find(p => p.name === person.name))){
            const id = generateID(persons.length, 1)
            person['id'] = id + 1
            // console.log(person)
            persons = persons.concat(person)
            console.log(persons)
            return(rep.json(person))
        }
        return(rep.status(400).json(
            {
                'error': 'Name already exists'
            }
        ))
        
    }else{
        return(
            rep.status(400).json({
                'error': "name/number canot be empty"
            })
        )
    }
})

app.listen(PORT)
console.log(`server is running on port ${PORT}`)