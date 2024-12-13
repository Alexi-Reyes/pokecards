'use client'

import { useRouter } from 'next/navigation'

export default function Selector({ generations, gen }) {
    const router = useRouter()
    return (
        <> 
            <select 
                name="generations" 
                id="dropdown-gen"
                onChange={(event) => router.push(`/Collection/${event.target.value}`)}
            >
                <option value="none">Select Generation</option>
                {
                        generations.map((gen) => (
                            <option key={gen.name} value={gen.name}>{gen.name}</option>
                        ))
                }
            </select>
        </>
    )
}