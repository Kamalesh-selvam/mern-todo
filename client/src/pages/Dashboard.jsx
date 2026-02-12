import React, { useEffect, useState } from 'react'
import API from '../services/api'
import Header from '../components/Header'
import TodoItem from '../components/TodoItem'

export default function Dashboard(){
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchTodos = async () => {
    try {
      const res = await API.get('/api/todos')
      setTodos(res.data)
    } catch (e) {
      console.error(e)
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchTodos() }, [])

  const add = async e => {
    e.preventDefault();
    if (!text) return
    try {
      const res = await API.post('/api/todos', { text })
      setTodos(prev => [res.data, ...prev])
      setText('')
    } catch (e) { console.error(e) }
  }

  const toggle = async t => {
    try {
      const res = await API.put(`/api/todos/${t._id}`, { completed: !t.completed })
      setTodos(prev => prev.map(it => it._id === t._id ? res.data : it))
    } catch (e) { console.error(e) }
  }

  const del = async t => {
    try {
      await API.delete(`/api/todos/${t._id}`)
      setTodos(prev => prev.filter(it => it._id !== t._id))
    } catch (e) { console.error(e) }
  }

  const logout = () => { localStorage.removeItem('token'); window.location.reload() }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <Header onLogout={logout} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <form onSubmit={add} className="flex gap-2 mb-4">
                <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add a new task" className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                <button className="bg-indigo-600 text-white px-4 rounded-lg">Add</button>
              </form>

              {loading ? <div className="p-6 text-center">Loading...</div> : (
                <div className="space-y-3">
                  {todos.length === 0 && <div className="text-gray-500 p-6 text-center">No todos yet — add your first task!</div>}
                  {todos.map(t => (
                    <TodoItem key={t._id} todo={t} onToggle={toggle} onDelete={del} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Tips removed per request */}
        </div>
      </div>
    </div>
  )
}
