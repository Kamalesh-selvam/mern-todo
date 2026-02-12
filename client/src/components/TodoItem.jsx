import React from 'react'

export default function TodoItem({ todo, onToggle, onDelete }){
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm transition transform hover:scale-[1.01]">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} className="w-5 h-5 text-indigo-600 rounded" />
          <div className={"text-sm " + (todo.completed ? 'line-through text-gray-400' : 'text-gray-800')}>{todo.text}</div>
        </label>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs text-gray-400">{new Date(todo.createdAt).toLocaleString()}</div>
        <button onClick={() => onDelete(todo)} className="text-red-500 hover:text-red-600 text-sm">Delete</button>
      </div>
    </div>
  )
}
