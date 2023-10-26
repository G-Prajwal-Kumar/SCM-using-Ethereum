import './CSS/Division.css';
import Popup from 'reactjs-popup';
import { useRef, useState } from 'react';

export default function Division(props) {
    console.log(props.info.current)

    const data = useRef(new FormData());
    const data1 = useRef(new FormData());

    async function addRequest() {
        const id = data.current.get("ProductName");
        const name = data.current.get("Count");
        const pass = data.current.get("Info");

        try {
            await props.ct.methods.createUnit(props.id, props.pass, id, name, pass).send({from : props.account}).then((res) => {
                if(res.status === 1n){
                    alert("Unit Created!");
                }
            });
        } catch (error) {
            if(error.code === 1100) alert("Invalid Input Values");
            else alert("Error Occured. Unit not Created!");
        }
        return false;
    }
    async function addRequest1() {
        const id = data1.current.get("ProductName1");
        const quan = parseInt(data1.current.get("Count1"), 10);
        const prod = data1.current.get("Info1");

        try {
            await props.ct.methods.DDSTsupplyADST(props.id, props.pass, id, prod, quan).send({from : props.account}).then((res) => {
                if(res.status === 1n){
                    props.reset();
                }
            });
        } catch (error) {
            if(error.code === 1100) alert("Invalid Input Values");
            else alert("Error Occured. Unit not Created!");
        }
        return false;
    }

    const [inventories, setInventories] = useState();

    const Inven = {};
    const MyInven = useRef();

    const handleGetInventories = async () => {
        try {
            MyInven.current = props.info.current.Inventory;
            console.log(MyInven.current)
            await props.ct.methods.DDSTviewInventory(props.id, props.pass).call({from : props.account}).then((res) => {
                setInventories(JSON.parse(res));
            });
        } catch (error) {
            console.error(error);
            alert("Error Occured. Could not get Inventories");
        }
        return false;
    };

    const handleAccept = async (id) => {
        try {
            await props.ct.methods.DDSTcheckUnits(props.id, parseInt(id, 10), props.pass).send({from : props.account}).then((res) => {
                props.reset()
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="Container" style={{float: 'left', width: '100%', height: '100%', paddingBottom: '2%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" style={{position: "absolute", top: 0, right: 0, marginTop: "1em", cursor: 'pointer', marginRight: "1em"}} onClick = {() => props.log()}>
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            <h1 style={{fontSize: '1.5em', margin: 0, marginTop: '0.5em', borderBottom: '2px solid black', width: '100%', textAlign: 'center', paddingBottom: '0.8em'}}>Deputy Director of Supply and Transportation</h1>
            <h1 style={{fontSize: '1.5em', margin: 0, marginTop: '0.5em', marginBottom: '0.5em'}}>{props.info.current.Name}</h1>
            <div className="button-container">
                <button onClick={handleGetInventories}>Get Inventories</button>
            
            <Popup trigger={
                    <button className="add-request-button">Create Unit</button>
                } modal nested>
                    {close => (
                        <div classNameName='modal' style={{padding: "1em 2em"}}>
                            <div classNameName='content'>
                                <form id="form">
                                    <div className="form-group" style={{marginTop: '0.5em'}}>
                                        <label htmlFor="ProductName">Unit Id</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="ProductName"
                                            placeholder="ID"
                                            onChange={(e) => {
                                                if (data.current.has("ProductName")) {
                                                    data.current.set("ProductName", e.target.value);
                                                } else {
                                                    data.current.append("ProductName", e.target.value);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{marginTop: '0.5em'}}>
                                        <label htmlFor="Count">Unit Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Count"
                                            placeholder="Name"
                                            onChange={(e) => {
                                                if (data.current.has("Count")) {
                                                    data.current.set("Count", e.target.value);
                                                } else {
                                                    data.current.append("Count", e.target.value);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{marginTop: '0.5em'}}>
                                        <label htmlFor="Info">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="Info"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                if (data.current.has("Info")) {
                                                    data.current.set("Info", e.target.value);
                                                } else {
                                                    data.current.append("Info", e.target.value);
                                                }
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div>
                                <button style={{marginLeft: '38%', marginTop: '1em'}}
                                    onClick={() => {
                                        addRequest();
                                        close();
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
                <Popup trigger={
                <button className="add-request-button">Send Inventory</button>
                } modal nested>
                    {close => (
                        <div classNameName='modal' style={{padding: "1em 2em"}}>
                            <div classNameName='content'>
                                <form id="form">
                                    <div className="form-group" style={{marginTop: '0.5em'}}>
                                        <label htmlFor="ProductName1">Divison ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="ProductName1"
                                            placeholder="ID"
                                            onChange={(e) => {
                                                if (data1.current.has("ProductName1")) {
                                                    data1.current.set("ProductName1", e.target.value);
                                                } else {
                                                    data1.current.append("ProductName1", e.target.value);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{marginTop: '0.5em'}}>
                                        <label htmlFor="Info1">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Info1"
                                            placeholder="Name"
                                            onChange={(e) => {
                                                if (data1.current.has("Info1")) {
                                                    data1.current.set("Info1", e.target.value);
                                                } else {
                                                    data1.current.append("Info1", e.target.value);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{marginTop: '0.5em'}}>
                                        <label htmlFor="Count1">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="Count1"
                                            placeholder="Count"
                                            onChange={(e) => {
                                                if (data1.current.has("Count1")) {
                                                    data1.current.set("Count1", e.target.value);
                                                } else {
                                                    data1.current.append("Count1", e.target.value);
                                                }
                                            }}
                                            />
                                    </div>
                                </form>
                            </div>
                            <div>
                                <button style={{marginLeft: '38%', marginTop: '1em'}}
                                    onClick={() => {
                                        addRequest1();
                                        close();
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
            <div>
            {(inventories === undefined) ? "" : <h2 style={{margin: '1em', fontSize: '1.25em'}}>Unit's Inventories</h2>}
                <div className="card-container">
                    {(inventories !== undefined)?
                        Object.keys(inventories).map((req, i) => {
                            if(req !== "dummy"){
                            Object.keys(inventories[req]).map((reqs, j) => {
                                if(reqs !== "dummy"){
                                    if(Inven[reqs] !== undefined){
                                        Inven[reqs] += parseInt(inventories[req][reqs]);
                                    }else{
                                        Inven[reqs] = parseInt(inventories[req][reqs]);
                                    }
                                }
                            })
                        }
                    }):""}
                    {Object.keys(Inven).map((reqs, i) => {
                        return(
                        <div className="card" key={i}>
                            <h4 style={{marginRight: 0}}><b>{reqs}</b></h4>
                            <p>Count: {Inven[reqs]}</p>
                        </div>)
                    })}
                </div>
            </div>
            <div>
            {(MyInven.current === undefined) ? "" : <h2 style={{margin: '1em', fontSize: '1.25em'}}>My Inventory</h2>}
                <div className="card-container">
                    {(MyInven.current === undefined) ? "" :
                    Object.keys(MyInven.current).map((reqs, i) => {
                        if(reqs !== "dummy"){
                        return(
                        <div className="card" key={i}>
                            <h4 style={{marginRight: 0}}><b>{reqs}</b></h4>
                            <p>Count: {MyInven.current[reqs]}</p>
                        </div>)}
                    })}
                </div>
            </div>
            <div>
            <h2 style={{margin: '0.75em', fontSize: '1.25em'}}>Requests</h2>
                <div className="card-container">
                    {Object.keys(props.info.current.RequestsIn).map((req, i) => (
                        (req === "dummy" || props.info.current.RequestsIn[req].ApprovedId !== "") ? "" : 
                        <div className="card" key={i}>
                            <h4 style={{marginRight: 0}}><b>{props.info.current.RequestsIn[req].Product}</b></h4>
                            <p>Quantity : {props.info.current.RequestsIn[req].Quantity}</p>
                            <p>Request By : {props.info.current.RequestsIn[req].Owner}</p>
                            <p>ID : {req}</p>
                            <p>Date: {props.info.current.RequestsIn[req].Date}</p>
                            <p>Current Level : {props.info.current.RequestsIn[req].fromLevel}</p>
                            <div className="button-container">
                                {(props.info.current.RequestsIn[req].fromLevel === "ADST") ? 
                                <button onClick={() => handleAccept(req)}>Accept | Pass-On</button> : <button disabled style={{backgroundColor: 'grey'}}>Accept | Pass-On</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
