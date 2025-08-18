import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API from '../lib/api'
import { useAuthStore } from '../store'

export default function JobDetail(){
  const { id } = useParams()
  const [job,setJob]=useState(null)
  const [proposals,setProposals]=useState([])
  const [cover,setCover]=useState(''); const [bid,setBid]=useState('')
  const { user } = useAuthStore()

  useEffect(()=>{ (async()=>{
    const r = await API.get(`/jobs/${id}`); setJob(r.data.job)
    const p = await API.get(`/proposals/by-job/${id}`); setProposals(p.data.proposals)
  })() },[id])

  const submitProposal = async ()=>{
    const r = await API.post(`/proposals/${id}`, { cover_letter: cover, bid_pi: Number(bid) })
    setProposals([r.data.proposal, ...proposals]); setCover(''); setBid('')
  }

  const accept = async (pid)=>{
    await API.post(`/proposals/accept/${pid}`)
    alert('Proposal accepted. Contract created and awaiting funding.')
  }

  if (!job) return <div>Loading...</div>
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <div className="text-gray-600 mb-2">Budget: {job.budget_pi} Pi</div>
        <p className="whitespace-pre-wrap">{job.description}</p>
      </div>
      <div className="space-y-4">
        {user?.role==='freelancer' && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Send a proposal</h2>
            <textarea className="w-full border p-2 rounded h-28" placeholder="Cover letter" value={cover} onChange={e=>setCover(e.target.value)} />
            <input className="w-full border p-2 rounded my-2" placeholder="Your bid (Pi)" value={bid} onChange={e=>setBid(e.target.value)} />
            <button onClick={submitProposal} className="bg-indigo-600 text-white px-3 py-1 rounded w-full">Submit</button>
          </div>
        )}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Proposals</h2>
          <div className="space-y-3">
            {proposals.map(p=>(
              <div key={p.id} className="border rounded p-3">
                <div className="font-medium">{p.freelancer_name}</div>
                <div className="text-sm">Bid: {p.bid_pi} Pi</div>
                <p className="mt-2">{p.cover_letter}</p>
                {user?.role==='client' && p.status!=='accepted' && (
                  <button onClick={()=>accept(p.id)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">Accept</button>
                )}
                {p.status==='accepted' && <Link to={`/contract/${p.job_id}`} className="mt-2 inline-block text-indigo-700 underline">Go to contract</Link>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}