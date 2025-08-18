import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../lib/api'

export default function Jobs(){
  const [jobs,setJobs]=useState([])
  useEffect(()=>{ (async()=>{ const r = await API.get('/jobs'); setJobs(r.data.jobs) })() },[])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Open Jobs</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {jobs.map(j=>(
          <Link key={j.id} to={`/jobs/${j.id}`} className="block bg-white rounded shadow p-4">
            <div className="font-semibold">{j.title}</div>
            <div className="text-sm text-gray-600">Budget: {j.budget_pi} Pi</div>
            <p className="mt-2 text-gray-700 line-clamp-3">{j.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}