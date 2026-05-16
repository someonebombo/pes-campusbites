import { useState } from 'react'
import api from '../services/api'
import './StudentOrder.css'

const menuItems = [
  {
    id: 1,
    name: 'Vada Pav',
    price: 30,
    emoji: '🍔'
  },
  {
    id: 2,
    name: 'Pav Bhaji',
    price: 90,
    emoji: '🍛'
  },
  {
    id: 3,
    name: 'Chicken Roll',
    price: 90,
    emoji: '🌯'
  },
  {
    id: 4,
    name: 'Mocktail',
    price: 70,
    emoji: '🍹'
  }
]

function StudentOrder() {

  const [studentName, setStudentName] = useState('')
  const [studentUsn, setStudentUsn] = useState('')
  const [basket, setBasket] = useState([])

  const addItem = (item) => {
    setBasket([...basket, item])
  }

  const totalCost = basket.reduce(
    (sum, item) => sum + item.price,
    0
  )

  const placeOrder = async () => {

    try {

      const response = await api.post('/order', {
        studentName,
        studentUsn,
        basket,
        totalCost
      })

      alert(response.data.message)

      setBasket([])
      setStudentName('')
      setStudentUsn('')

    } catch (error) {

      console.error(error)

      alert('Order failed')
    }
  }

  return (
    <div className="student-layout">

      <div>

        <h2>Menu</h2>

        <div className="menu-grid">

          {menuItems.map((item) => (

            <div
              className="menu-card"
              key={item.id}
            >

              <div className="emoji">
                {item.emoji}
              </div>

              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <button
                onClick={() => addItem(item)}
              >
                Add
              </button>

            </div>
          ))}

        </div>

      </div>

      <div className="basket">

        <h2>Basket</h2>

        <input
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          placeholder="USN"
          value={studentUsn}
          onChange={(e) => setStudentUsn(e.target.value)}
        />

        {basket.map((item, index) => (
          <div key={index}>
            {item.name}
          </div>
        ))}

        <h3>Total: ₹{totalCost}</h3>

        <button
          className="place-order-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>
  )
}

export default StudentOrder