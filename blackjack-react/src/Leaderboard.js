import './App.css';
import React, { useState } from 'react';
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import { Link } from "react-router-dom";

function App() {
    const db = firebase.firestore();
    const [tableData, setTableData] = useState([]);

    window.addEventListener('load', () => {
        FetchData();
    });

    const FetchData = () => {
        db.collection("leaderboard").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                setTableData(arr => [...arr , data]);
            })
        })
        
    }
    console.log(tableData)
    return(
        <div>
            <div class='App'>
                <h4>reload page to see leaderboard</h4>
                <Link to="/">
                        <button >Go Home</button>
                </Link>
            </div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                <tbody>
                    {tableData.map(data => {
                        return(
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
}

export default App;