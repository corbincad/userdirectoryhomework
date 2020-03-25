import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Table() {
    const [data, setData] = useState(null);

    useEffect(() => {
        Axios.get('https://randomuser.me/api/?results=250')
            .then(res => setData(res.data.results))
    }, []);

    const sortByAgeDecending = () => {
        const sortedD = [...searchResults].sort((a, b) => {
            return b.dob.age - a.dob.age;
        });
        setSearchResults(sortedD);
    }

    const sortByAgeAscending = () => {
        const sortedA = [...searchResults].sort((a, b) => {
            return a.dob.age - b.dob.age;
        });
        setSearchResults(sortedA);
    }

    const [searchTerm, setSearchTerm] = useState("");
    
    const handleChange = event => {
        setSearchTerm(event.target.value);
    }


    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.log(searchTerm);
        const results = data && data.filter(emp => 
            emp.name.first.toLowerCase().includes(searchTerm));
            setSearchResults(results);
            console.log(searchResults);
    }, [searchTerm, data]);


    return (
        <>
        <input type='text' placeholder='Search' value={searchTerm} onChange={handleChange} className='align-self-center' />
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Picture</th>
                    <th scope="col">Name</th>
                    <th scope="col" >Age<i className="fas fa-arrow-down" onClick={sortByAgeDecending}></i><i className="fas fa-arrow-up" onClick={sortByAgeAscending}></i></th>
                    <th scope="col">City</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {searchResults && searchResults.map(emp => (
                    <tr key={emp.login.uuid}>
                        <th scope="row"><img src={emp.picture.thumbnail} /></th>
                        <td>{emp.name.first} {emp.name.last}</td>
                        <td>{emp.dob.age}</td>
                        <td>{emp.location.city}</td>
                        <td>{emp.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}