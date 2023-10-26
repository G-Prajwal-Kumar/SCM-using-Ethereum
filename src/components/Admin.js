import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './CSS/Admin.css';
import { useRef, useState } from 'react';

export default function Admin(props) {
    const [ready, setReady] = useState(0);
    const data = useRef(new FormData());
    const data1 = useRef(new FormData());
    async function sample(){
        const id = data.current.get("name");
        const name = data.current.get("username");
        const pass = data.current.get("password");
        const level = data.current.get("level");

        try {
            await props.ct.methods.createAccount(id, name, level, pass).send({from : props.account}).then((res) => {
                if(res.status === 1n){
                    props.reset();
                    alert("User Created!");
                }
            });
        } catch (error) {
            if(error.code === 1100) alert("Invalid Input Values");
            else alert("Error Occured. Role not Created!");
        }
        return false;
    }
    async function sample1(){
        const id = data1.current.get("name");
        const level = parseInt(data1.current.get("level"),10);

        try {
            await props.ct.methods.updateMFG_SM(id, level).send({from : props.account}).then((res) => {
                if(res.status === 1n){
                    props.reset();
                    alert("Role Updated!");
                }
            });
        } catch (error) {
            if(error.code === 1100) alert("Invalid Input Values");
            else alert("Error Occured. Update did not occur!");
        }
        return false;
    }

    const Users = useRef();

    const getUsers = async() => {
        try {
            await props.ct.methods.getUsers().call({from : props.account}).then((res) => {
                Users.current = JSON.parse(res);
                setReady(1);
            });
        } catch (error) {
            alert("Error Occured!");
            console.log(error);
        }
        console.log(Users.current)
        return false;
    }

    getUsers();

    if(ready === 0){
        return("");
    }
    return (
        <div style={{height: '100%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" style={{position: "absolute", top: 0, right: 0, marginTop: "1.2em", cursor: 'pointer', marginRight: "1em"}} onClick = {() => props.log()}>
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            <h1 style={{fontSize: '1.5em', margin: 0, paddingTop: '0.5em', borderBottom: '2px solid black', width: '100%', textAlign: 'center', paddingBottom: '0.8em'}}>Admin</h1>
            <div className='component' style={{width: '35em', height: 'auto', display: 'flex', justifyContent: 'space-around', position: 'relative', left: '50%', transform: 'translate(-50%, 0)', marginTop: '14em'}}>
                <Popup trigger=
                    {<button>Create Role</button>}
                    modal nested>
                    {
                        close => (
                            <div classNameName='modal'>
                                <div classNameName='content'>
                                    <form id="form">
                                        <div className="form-group" style={{marginTop: '0.7em'}}>
                                            <label for="exampleFormControlInput1">User ID</label>
                                            <input type="text" className="form-control" id="ID" placeholder="ID" onChange={(e) => { if (data.current.has("name")) { data.current.set("name", e.target.value) } else { data.current.append("name", e.target.value) } }} />
                                        </div>
                                        <div className="form-group" style={{marginTop: '0.7em'}}>
                                            <label for="exampleFormControlInput1">Name</label>
                                            <input type="email" className="form-control" id="name" placeholder="Username" onChange={(e) => { if (data.current.has("username")) { data.current.set("username", e.target.value) } else { data.current.append("username", e.target.value) } }} />
                                        </div>
                                        <div class="form-group" style={{marginTop: '0.7em'}}>
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" class="form-control" id="password" placeholder="Password" onChange={(e) => { if (data.current.has("password")) { data.current.set("password", e.target.value) } else { data.current.append("password", e.target.value) } }}/>
                                        </div>
                                        <div className="form-group" style={{marginTop: '0.7em', marginBottom: '0.7em'}}>
                                            <label for="exampleFormControlSelect1">Level of the Role</label>
                                            <select className="form-control" id="level" onChange={(e) => { if (data.current.has("level")) { data.current.set("level", e.target.value) } else { data.current.append("level", e.target.value) } }}>
                                                <option defaultValue="" selected disabled hidden>Choose here</option>
                                                <option value="DGST">Supply Manager</option>
                                                <option value="Manufacturer">Manufacturer</option>
                                                <option value="DDST">Division</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <button onClick=
                                        {async () => {
                                            sample();
                                            close();
                                        }} style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0)'}}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </Popup>
                <Popup trigger=
                    {<button>Update Role</button>}
                    modal nested>
                    {
                        close => (
                            <div classNameName='modal'>
                                <div classNameName='content'>
                                    <form id="form">
                                        <div className="form-group" style={{marginTop: '0.7em'}}>
                                            <label for="exampleFormControlInput1">User ID</label>
                                            <input type="text" className="form-control" id="ID" placeholder="ID" onChange={(e) => { if (data1.current.has("name")) { data1.current.set("name", e.target.value) } else { data1.current.append("name", e.target.value) } }} />
                                        </div>
                                        <div className="form-group" style={{marginTop: '0.7em', marginBottom: '0.7em'}}>
                                            <label for="exampleFormControlSelect1">Choose the Role</label>
                                            <select className="form-control" id="level" onChange={(e) => { if (data1.current.has("level")) { data1.current.set("level", e.target.value) } else { data1.current.append("level", e.target.value) } }}>
                                                <option defaultValue="" selected disabled hidden>Choose here</option>
                                                <option value='1'>Supply Manager</option>
                                                <option value='0'>Manufacturer</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <button onClick=
                                        {async () => {
                                            sample1();
                                            close();
                                        }} style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0)'}}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </Popup>
                <Popup trigger=
                    {<button>Get User Details</button>}
                    modal nested>
                    {
                        
                        close => (
                            
                            <div classNameName='modal'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" onClick={async () => {close()}} style={{position: 'absolute', right: '1em', cursor: 'pointer'}}>
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                                <table class="table table-striped" style={{textAlign: 'center'}}>
                                <thead>
                                    <tr>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Level</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(Users.current).map((res, i) => {
                                            if(res !== 'dummy'){
                                            return(
                                            <tr>
                                                <th scope="row">{res}</th>
                                                <td>{Users.current[res].Level}</td>
                                                <td>{Users.current[res].Name}</td>
                                                <td>{Users.current[res].Password}</td>
                                            </tr>
                                            )
                                            }
                                        })
                                    }
                                </tbody>
                                </table>
                                {/* <div>
                                    <button onClick=
                                        {async () => {
                                            close();
                                        }} style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0)'}}>
                                        Submit
                                    </button>
                                </div> */}
                            </div>
                        )
                    }
                </Popup>
            </div>
        </div>
    )
};