import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../lib/api'
import { createPayment } from '../lib/pi'

export default function Contract(){
  const { id } = useParams()
  const [msg,setMsg]=useState(''); const [err,setErr]=useState('')

  const fund = async ()=>{
    setMsg(''); setErr('')
    try{
      const r = await API.post(`/contracts/${id}/fund`)
      await createPayment(r.data.piPaymentRequest)
      setMsg('Escrow payment initiated. Complete in Pi Browser, then webhook will mark it funded.')
    }catch(e){ setErr(e.response?.data?.error || e.message) }
  }

  const release = async ()=>{
    setMsg(''); setErr('')
    try{
      const r = await API.post(`/contracts/${id}/release`)
      setMsg(`Funds released to freelancer. Platform fee: ${r.data.fee_pi} Pi`)
    }catch(e){ setErr(e.response?.data?.error || e.message) }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Contract</h1>
      {msg && <div className="bg-green-100 text-green-700 p-2 mb-2 rounded">{msg}</div>}
      {err && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{err}</div>}
      <div className="space-x-2">
        <button onClick={fund} className="bg-indigo-600 text-white px-3 py-1 rounded">Fund Escrow</button>
        <button onClick={release} className="bg-green-600 text-white px-3 py-1 rounded">Release Funds</button>
      </div>
      <p className="text-sm text-gray-600 mt-3">For demo: Fund starts a Pi payment (client → app escrow). Release credits freelancer's in-app balance (minus 10% fee).</p>
    </div>
  )
}