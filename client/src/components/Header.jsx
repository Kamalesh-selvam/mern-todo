import React from 'react'

export default function Header({ onLogout }){
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">MT</div>
        <h1 className="text-xl font-semibold">MERN TODO</h1>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onLogout} className="text-sm text-red-600 hover:underline">Sign out</button>
      </div>
    </header>
  )
}
