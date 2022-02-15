import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './user.scss'
type userDetails =
    {
        "id": number,
        "name": string,
        "username": string,
        "email": string,
        "address": {
            "street": string,
            "suite": string,
            "city": string,
            "zipcode": string,
            "geo": {
                "lat": string,
                "lng": string,
            }
        },
        "phone": string,
        "website": string,
        "company": {
            "name": string,
            "catchPhrase": string,
            "bs": string,
        }
    }

export default function User() {
    const router = useNavigate()
    const [users, setUsers] = useState<userDetails[]>([] as userDetails[])
 // making an ajax request to the users end point 
    useEffect(() => {
        async function handleUsers() {
            try {
                const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(data);

            } catch (error) {
                alert(error)
            }
        }
        handleUsers()
    }, [])

    // navigate each users to a separate page
    function handleTask(id: number) {
        router(`/users/${id}`)
    }

    // handle individual task and its implementation
    type taskProps = {
        "userId": number,
        "id": number,
        "title": string,
        "completed": boolean
    }
    const [param, setParam] = useState<string | undefined>(undefined)
    const [tasks, setTasks] = useState<taskProps[]>([] as taskProps[]);
    const [taskData, setTaskData] = useState<taskProps>({} as taskProps)
    const params = useParams();
    let queryString = params["*"]
    // making an ajax request to the task end point 
    useEffect(() => {
        async function handleQueryString() {
            try {
                const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
                setTasks(data)
            } catch (error) {
                alert(error)
            }
        }
        handleQueryString();
    }, [])




    useEffect(() => {
        setParam(queryString)
        const result = tasks?.filter((item) => item.id === (param && parseInt(param && param)));
        setTaskData(result[0])
    }, [queryString, param, tasks]);
    // implementing completed task...
    function handleCompleted(id: number) {
        let result = tasks?.filter((item) => item.id === (param && parseInt(param && param)));
        result[0].completed = true;
        setTasks([...tasks, result[0]])
    }
    return (
        <div className="user_task">
            <div className="user_task_wrapper">
                <div className="title">Onboarding tracker</div>
                <div className="container">
                    <div className="user">
                        <h2>Users</h2>
                        <ul>
                            {
                                users?.map((user) => {
                                    return <li className={user.id === (param && parseInt(param && param)) ? "active" : ""} key={user.id} onClick={() => handleTask(user.id)}>
                                        <span>{user.name}</span>
                                        <span></span>
                                    </li>
                                })
                            }


                        </ul>
                    </div>
                    <div className="task">
                        <h2>Tasks List</h2>
                        <ul>
                            <li>
                                <div className="isCompleted_wrapper">
                                    <h3>IsCompleted</h3>
                                    <input type="checkbox" checked={taskData?.completed} onClick={() => handleCompleted(taskData?.id)} />
                                </div>
                                <div className="title_wrapper">
                                    <h3>Title</h3>
                                    <p>{taskData?.title}</p>
                                </div>

                            </li>

                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}
