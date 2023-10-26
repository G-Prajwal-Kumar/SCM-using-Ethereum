import './CSS/Manufacturer.css';
import Popup from 'reactjs-popup';
import { useRef, useState } from 'react';

export default function Manufacturer(props) {
    console.log(props.info.current)
    const data = useRef(new FormData());
    const [inventories, setInventories] = useState("");

    async function addRequest() {
        const productName = data.current.get("ProductName");
        const quan = parseInt(data.current.get("Info"), 10)

        try {
            await props.ct.methods.MFGgenerate(props.id, productName, quan, props.pass).send({from : props.account}).then((res) => {
                handleGetInventories();
                alert("Inventory Updated!");
            });
        } catch (error) {
            if(error.code === 1100){
                alert("Invalid Values!")
            }else{
                alert("Error Occured!")
            }
        }
        return false;
    }

    const handleGetInventories = async () => {
        try {
            await props.ct.methods.ManuViewInventory(props.id, props.pass).call({from : props.account}).then((res) => {
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
            await props.ct.methods.MFGapprove(props.id, parseInt(id, 10), props.pass).send({from : props.account}).then((res) => {
                props.reset();
            });
        } catch (error) {
            alert("Error Occured. Request not Approved!")
        }
        return false;
    };

    return (
        <div className="container" style={{float: 'left', width: '100%', height: '100%', padding: 0, paddingBottom: '2%', maxWidth: '100%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" style={{position: "absolute", top: 0, right: 0, marginTop: "1em", cursor: 'pointer', marginRight: "1em"}} onClick = {() => props.log()}>
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            <h1 style={{fontSize: '1.5em', margin: 0, marginTop: '0.5em', borderBottom: '2px solid black', width: '100%', textAlign: 'center', paddingBottom: '0.8em'}}>Manufacturer</h1>
            <h1 style={{fontSize: '1.5em', margin: 0, marginTop: '0.5em', marginBottom: '0.5em'}}>{props.info.current.Name}</h1>
            <div className="button-container">
                <button onClick={handleGetInventories}>Get Inventories</button>
                {/* <button>Get Inventories</button> */}
            </div>
            <h2 style={{margin: '0.75em', fontSize: '1.25em'}}>Requests</h2>
            <div className="card-container">
                {/* {filteredRequests.map(request => renderRequestCard(request))} */}
                {Object.keys(props.info.current.RequestsIn).map((req, i) => (
                    (req === "dummy" || props.info.current.RequestsIn[req].ApprovedId !== "") ? "" : 
                    <div className="card" key={i}>
                        <h4 style={{marginRight: '0'}}><b>{props.info.current.RequestsIn[req].Product}</b></h4>
                        <p>Quantity : {props.info.current.RequestsIn[req].Quantity}</p>
                        <p>Request By : {props.info.current.RequestsIn[req].Owner}</p>
                        <p>ID : {req}</p>
                        <p>Date: {props.info.current.RequestsIn[req].Date}</p>
                        <p>Current Level : {props.info.current.RequestsIn[req].fromLevel}</p>
                        <div className="button-container">
                            {(props.info.current.RequestsIn[req].fromLevel === "DGST") ? 
                            <button onClick={() => handleAccept(req)}>Accept | Pass-On</button> : <button disabled style={{backgroundColor: 'grey'}}>Accept | Pass-On</button>}
                            {/* <button onClick={() => handlePassOn(Id)}>Pass On</button> */}
                        </div>
                    </div>
                ))}
            </div>
            <Popup trigger={
                <button className="add-request-button" style={{marginTop: '1.25em'}}>Add Inventory</button>
            } modal nested>
                {close => (
                    <div classNameName='modal' style={{padding: '1em 2em'}}>
                        <div classNameName='content'>
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
                                    <label htmlFor="Info">Quantity</label>
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
            <h2 style={{margin: '1em', fontSize: '1.25em'}}>Inventories</h2>
                <div className="card-container">
                    {/* {inventories.map(inventory => renderInventoryCard(inventory))} */}
                    {
                        (inventories !== "") ? 
                        Object.keys(inventories).map((req, i) => (
                            (req === "dummy") ? "" : 
                            <div className="card" key={i}>
                                <h4 style={{marginRight: 0}}><b>{req}</b></h4>
                                <p>Count: {inventories[req]}</p>
                            </div>
                        )) : ""
                    }
                </div>     
        </div>
    );
}
