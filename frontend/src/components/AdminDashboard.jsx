import { useEffect, useState } from 'react'
import api from '../services/api'
import './AdminDashboard.css'

function AdminDashboard() {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {

    try {

      const response = await api.get('/orders')

      setOrders(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  useEffect(() => {

    fetchOrders()

    const interval = setInterval(() => {
      fetchOrders()
    }, 3000)

    return () => clearInterval(interval)

  }, [])

  const completeOrder = async (id) => {

    try {

      await api.post('/order/complete', {
        id
      })

      fetchOrders()

    } catch (error) {

      console.error(error)
    }
  }

  return (
    <div>

      <h2>Kitchen Dashboard</h2>

      <div className="orders-grid">

        {orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <h3>Token #{order.id}</h3>

            <p>{order.studentName}</p>

            <p>{order.studentUsn}</p>

            <div>

              {order.basket.map((item, index) => (
                <div key={index}>
                  {item.name}
                </div>
              ))}

            </div>

            <h4>₹{order.totalCost}</h4>

            <button
              onClick={() => completeOrder(order.id)}
            >
              Complete
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AdminDashboard