import { useState } from 'react'
import StudentOrder from './components/StudentOrder'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {

  const [view, setView] = useState('student')

  return (
    <div className="app">

      <header className="header">

        <h1>🍔 PES Campus Bites</h1>

        <div className="buttons">

          <button
            onClick={() => setView('student')}
          >
            Student
          </button>

          <button
            onClick={() => setView('admin')}
          >
            Admin
          </button>

        </div>

      </header>

      <main>

        {view === 'student'
          ? <StudentOrder />
          : <AdminDashboard />}

      </main>

    </div>
  )
}

export default App