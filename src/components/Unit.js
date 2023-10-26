import './CSS/Unit.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useRef } from 'react';

export default function Unit(props) {
    console.log(props);
    const data = useRef(new FormData());

    async function addRequest() {
        const productName = data.current.get("ProductName");
        const count = parseInt(data.current.get("Count"), 10);
        const date = data.current.get("Info");
        try {
            await props.ct.methods.ADSTrequestCreate(props.id, productName, count, date, props.pass).send({from : props.account}).then((res) => {
                if(res.status === 1n){
                    props.reset()
                }
            });
        } catch (error) {
            if(error.code === 100){
                alert("Request Rejected at Metamask!")
            }else{
                alert("Error Occured!")
            }
        }
        return false;
    }

    return (
        
        <div className="Container" style={{float: 'left', width: '100%', height: '100%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" style={{position: "absolute", top: 0, right: 0, marginTop: "1.2em", cursor: 'pointer', marginRight: "1em"}} onClick = {() => props.log()}>
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            <h1 style={{fontSize: '1.5em', margin: 0, marginTop: '0.5em', borderBottom: '2px solid black', width: '100%', textAlign: 'center', paddingBottom: '0.8em'}}>Assistant Director of Supply and Transportation</h1>
            <h1 style={{fontSize: '1.5em', margin: 0, marginTop: '0.5em', marginBottom: '0.5em'}}>{props.info.current.Name}</h1>
            <div className="inventories">
                <h2 style={{fontSize: '1.25em'}}>Your Inventory - </h2>
                <div className="card-container">
                    {Object.keys(props.info.current.Inventory).map((item, i) => (
                        (item === "dummy") ? "" : 
                        <div className="card" key={i}>
                            <h4 style={{marginRight: 0}}><b>{item}</b></h4>
                            <p>Count: {props.info.current.Inventory[item]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='Reqs'>
                <Popup trigger={
                    <button className="add-request-button">Add a Request</button>
                } modal nested>
                    {close => (
                        <div classNameName='modal'  style={{padding: "1em 2em"}}>
                            <div classNameName='content' >
                                <form id="form">
                                    <div className="form-group" style={{marginTop: '0.5em'}}>
                                        <label htmlFor="ProductName">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="ProductName"
                                            placeholder="Product Name"
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
                                        <label htmlFor="Count">Count</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="Count"
                                            placeholder="Count"
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
                                        <label htmlFor="Info">Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Info"
                                            placeholder="Date"
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
                <h3 style={{marginRight : 0 , marginTop: '0.5em', marginBottom: '0.5em'}}>Your Requests</h3>
                <div className="card-container">
                    {/* {requests.map(request => requestCard(request))} */}
                    {Object.keys(props.info.current.RequestsOut).map((request, i) => (
                        (request === "dummy") ? "" : 
                        <div className='card' key={i}>
                            <h4 style={{marginRight: 0}}><b>{props.info.current.RequestsOut[request].Product}</b></h4>
                            {/* <p>{request.ReqInfo}</p> */}
                            <p>Id : {request}</p>
                            <p>Date : {props.info.current.RequestsOut[request].Date}</p>
                            <p>Count: {props.info.current.RequestsOut[request].Quantity}</p>
                            <p>Current Level : {props.info.current.RequestsOut[request].fromLevel}</p>
                            {(props.info.current.RequestsOut[request].ApprovedId === "") ?  <p>Status : Pending</p> : 
                            <div>
                                <p>Approved Level : {props.info.current.RequestsOut[request].ApprovedLevel}</p>
                                <p>Approved By : {props.info.current.RequestsOut[request].ApprovedId}</p>
                            </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
