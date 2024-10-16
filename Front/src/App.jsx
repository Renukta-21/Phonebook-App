import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

function App() {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingReg, setEditingReg] = useState({ name: '', number: '' })
  const base_URL = 'https://phonebook-app-backend-6so5.onrender.com/contacts'

  useEffect(() => {
    fetch(`${base_URL}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedContacts = data.map((c) => {
          return {
            ...c,
            id: c._id,
          }
        })
        setContacts(formattedContacts)
      })
      .catch((err) => console.log(err.message))
    setEditingIndex(null)
  }, [])

  function handleDelete(id) {
    fetch(`${base_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error)
          })
        } else {
          setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id))
        }
      })
      .catch((err) => console.error(err))
  }
  function handleUpdate(id) {
    setEditingIndex(id)
    const updateElement = contacts.find((c) => c.id === id)
    setEditingReg({ name: updateElement.name, number: updateElement.number })

    if (editingIndex === id) {
      setEditingIndex(null)
      fetch(`${base_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...editingReg }),
      })
        .then((res) => res.json())
        .then((data) =>
          setContacts((prevContacts) => {
            return prevContacts.map((c) =>
              c.id !== id ? c : { ...data, id: data._id }
            )
          })
        )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    /* const maxId = contacts.reduce((max, contact) => {
      return contact.id > max ? contact.id : max
    }, 0) */
    const objForm = {
      name,
      number,
    }
    fetch(`${base_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objForm),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error)
          })
        }
        return res.json()
      })
      .then((res) => {
        console.log(res)
        setContacts((prevContacts) => [
          ...prevContacts,
          { ...res, id: res._id },
        ])
      })
      .catch((err) => console.log(err))
    setName('')
    setNumber('')
  }

  const isSmallScreen = useMediaQuery({ query: '(max-width:600px)' })
  const divStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: isSmallScreen ? 'center' : undefined,
  }
  const labelStyle = {
    textAlign: 'center',
    width: '100%',
    display: 'inline-block',
    marginTop: '10px',
  }
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h3>PhoneBook App</h3>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name" style={labelStyle}>
          Name:
        </label>
        <br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="number" style={labelStyle}>
          Number:
        </label>
        <br />
        <input
          type="text"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <button type="submit" style={{ margin: '10px auto', display: 'block' }}>
          Add
        </button>
      </form>
      <h3>Numbers</h3>
      <div style={divStyle}>
        {contacts.map((cont) => {
          return (
            <div
              key={cont.id}
              style={{
                height: '200px',
                aspectRatio: '1',
                border: '1px solid black',
                padding: '15px',
              }}
            >
              <small
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '10px',
                }}
              >
                {cont.id}
              </small>
              {editingIndex === cont.id ? (
                <div>
                  <label htmlFor="nameUpd">Name:</label>
                  <input
                    type="text"
                    id="nameUpd"
                    value={editingReg.name}
                    onChange={(e) => {
                      setEditingReg((prevData) => ({
                        ...prevData,
                        name: e.target.value,
                      }))
                    }}
                  />
                  <br />
                  <label htmlFor="numbUpd">Number:</label>
                  <input
                    type="text"
                    id="numbUpd"
                    value={editingReg.number}
                    onChange={(e) => {
                      setEditingReg((prevData) => ({
                        ...prevData,
                        number: e.target.value,
                      }))
                    }}
                  />
                </div>
              ) : (
                <div>
                  <p>Name: {cont.name}</p>
                  <p>Number: {cont.number}</p>
                </div>
              )}
              <br />
              <button onClick={() => handleDelete(cont.id)}>Delete</button>
              <button
                style={{ margin: '0px 10px' }}
                onClick={() => handleUpdate(cont.id)}
              >
                {editingIndex === cont.id ? 'Done' : 'Edit'}
              </button>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
