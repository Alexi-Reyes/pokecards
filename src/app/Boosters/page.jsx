'use client'

import Navbar from '../components/Navbar/navbar'
import { useEffect, useState } from 'react';

export default function Boosters() {
    const [generations, setGenerations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGeneration, setSelectedGeneration] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/generations');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setGenerations(result.data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOpenButtonClick = async () => {
        if (!selectedGeneration) return;
    
        try {
          const response = await fetch(`http://localhost:3000/api/generations/${selectedGeneration}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          console.log(result);
        } catch (error) {
          setError(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
    <>
        <Navbar></Navbar>
        <h2>Boosters</h2>
        <button onClick={handleOpenButtonClick}>Open</button>
        <select 
            name="generations" 
            id="dropdown-gen"
            value={selectedGeneration}
            onChange={(event) => setSelectedGeneration(event.target.value)}
        >
            {generations.map((gen) => (
                <option key={gen.name} value={gen.name}>{gen.name}</option>
            ))}
        </select>
    </>
    )
}