import React, { useEffect, useState } from 'react'
import API from '../lib/api'
import { useAuthStore } from '../store'

export default function Dashboard(){
  const [balance,setBalance]=useState(null)
  const { user } = useAuthStore()
  useEffect(()=>{ (async()=>{ const r = await API.get('/wallet/balance'); setBalance(r.data.balance) })() },[])
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="bg-white p-4 rounded shadow mt-4">
        <div><span className="font-semibold">Logged in as:</span> {user?.name} ({user?.role})</div>
        <div className="mt-2"><span className="font-semibold">Available balance:</span> {balance?.available_pi ?? 0} Pi</div>
        <div><span className="font-semibold">Escrow (held):</span> {balance?.escrow_pi ?? 0} Pi</div>
      </div>
    </div>
  )
}