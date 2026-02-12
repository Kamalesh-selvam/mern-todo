import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../services/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setErr('')
    try {
      const res = await API.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl transform transition duration-400 hover:scale-[1.01]">
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">MT</div>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <div className="mt-2 text-indigo-600 font-bold text-xl">TODO</div>
        </div>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <form onSubmit={submit} className="space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-medium transition">Sign in</button>
        </form>
        <p className="mt-4 text-sm">New? <Link to="/register" className="text-indigo-600">Create an account</Link></p>
      </div>
    </div>
  )
}
