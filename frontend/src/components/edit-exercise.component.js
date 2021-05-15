import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default function EditExercise(props) {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/exercises/' + props.match.params.id)
            .then(response => {
                const { username, description, duration, date } = response.data;

                setUsername(username);
                setDescription(description);
                setDuration(duration);
                setDate(new Date(date));
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                setUsers(response.data.map(user => user.username))
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onChangeDuration(e) {
        setDuration(e.target.value);
    }

    function onChangeDate(date) {
        setDate(date)
    }

    function onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        };

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }


    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            users.map(user => {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <DatePicker
                        selected={date}
                        onChange={onChangeDate}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )

}

