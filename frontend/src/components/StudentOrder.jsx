import { useState } from 'react'
import api from '../services/api'
import './StudentOrder.css'

const menuItems = [

  // 🥪 Street Food & Pav Favorites
  {
    id: 1,
    name: 'Vada Pav',
    price: 20,
    emoji: '🍔'
  },
  {
    id: 2,
    name: 'Mirchi Pav',
    price: 15,
    emoji: '🌶️'
  },
  {
    id: 3,
    name: 'Kurma Pav Bhaji',
    price: 40,
    emoji: '🍛'
  },
  {
    id: 4,
    name: 'Patal Bhaji Pav',
    price: 30,
    emoji: '🍲'
  },
  {
    id: 5,
    name: 'Mix Kurma Pav',
    price: 40,
    emoji: '🥣'
  },
  {
    id: 6,
    name: 'Ros Omelette Pav',
    price: 60,
    emoji: '🍳'
  },

  // 🍚 Rice & Main Course
  {
    id: 7,
    name: 'Chicken Biryani',
    price: 150,
    emoji: '🍗'
  },
  {
    id: 8,
    name: 'Veg Fried Rice',
    price: 100,
    emoji: '🍚'
  },

  // 🌯 Rolls
  {
    id: 9,
    name: 'Chicken Roll',
    price: 50,
    emoji: '🌯'
  },
  {
    id: 10,
    name: 'Mushroom Roll',
    price: 30,
    emoji: '🍄'
  },
  {
    id: 11,
    name: 'Paneer Roll',
    price: 40,
    emoji: '🧀'
  },

  // 🥤 Drinks & Beverages
  {
    id: 12,
    name: 'Coca-Cola (Can)',
    price: 20,
    emoji: '🥤'
  },
  {
    id: 13,
    name: 'Pepsi (Can)',
    price: 20,
    emoji: '🥤'
  },
  {
    id: 14,
    name: 'Sprite (Can)',
    price: 20,
    emoji: '🥤'
  },
  {
    id: 15,
    name: 'Normal Soda',
    price: 10,
    emoji: '🫧'
  },
  {
    id: 16,
    name: 'Refreshing Mocktail',
    price: 50,
    emoji: '🍹'
  },
  {
    id: 17,
    name: 'Maaza Mango Drink',
    price: 40,
    emoji: '🥭'
  },

  // 🍱 Meals & Thalis
  {
    id: 18,
    name: 'Standard Veg Thali',
    price: 100,
    emoji: '🍱'
  },
  {
    id: 19,
    name: 'Mackeral Fish Thali',
    price: 150,
    emoji: '🐟'
  },
  {
    id: 20,
    name: 'King Fish Special Thali',
    price: 220,
    emoji: '👑'
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
          placeholder="Roll no"
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