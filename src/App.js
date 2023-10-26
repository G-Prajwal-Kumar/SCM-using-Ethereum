import './App.css';
import Division from './components/Division';
import Manufacturer from './components/Manufacturer';
import Admin from './components/Admin';
import Unit from './components/Unit';
import SupplyM from './components/SupplyM';
import Web3 from 'web3';
import { useRef, useState } from 'react';

function App() {
  const loggedInUser = useRef();
  const [ready, setReady] = useState(0);
  const username = useRef();
  const password = useRef();
  const web3 = useRef();
  const contractInstance = useRef();
  const Info = useRef("");
  const accounts = useRef();
  web3.current = new Web3(window.ethereum);
  contractInstance.current = new web3.current.eth.Contract(JSON.parse(process.env.REACT_APP_ABI).abi, process.env.REACT_APP_Address);

  const getInfo = async() => {
    Info.current = await contractInstance.current.methods.viewAllInfo(username.current, password.current).call({from : accounts[0]});
    Info.current = JSON.parse(Info.current);
    setReady(ready+1);
  }

  const logout = () => {
    loggedInUser.current = undefined;
    setReady(0);
  }

  async function connectWallet(){
    if(window.ethereum){
      try{
        accounts.current = await window.ethereum.request({method: "eth_requestAccounts"});
      }catch(error){
        console.error(error);
      }
    }else{
      alert("Metamask not Installed!");
    }
  }
  connectWallet();
  

  const handleLogin = async () => {
    try {
      await contractInstance.current.methods.login(username.current, password.current).call({from : accounts.current[0]}).then((res) => {
        loggedInUser.current = res;
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {(ready === 0) ? 
          <div style={{marginTop: '1em', float: 'left', width: '100%'}}>
          <h1 style={{fontSize: '1.5em', left: '50%', transform: 'translate(-50%, 0%)', position: 'absolute', textAlign: 'center', margin: 0}}>Blockchain-Enabled Supply Chain Management for Indian Army</h1>
          <div style={{width: 'auto', position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)', marginTop: '13em'}}>
          <h1 style={{fontSize: '1.5em', margin: '0'}}>Login</h1>
          <input type="text" placeholder="Username" id="username" className='form-control' style={{margin: '0.5em'}}/>
          <input type="password" placeholder="Password" id="password" className='form-control' style={{margin: '0.5em'}}/>
          <button
            onClick={() => {
              username.current = document.getElementById('username').value;
              password.current = document.getElementById('password').value;
              handleLogin();
              getInfo();
            }}
            style={{marginLeft: '1em', width: '8.5em'}}
            >
            Login
          </button>
          </div>
        </div>
       : (loggedInUser.current === 'ADST') ? <Unit ct = {contractInstance.current} info = {Info} account = {accounts.current[0]} id = {username.current} pass = {password.current} log = {logout} reset = {getInfo}/>
       : (loggedInUser.current === 'DDST') ? <Division ct = {contractInstance.current} info = {Info} account = {accounts.current[0]} id = {username.current} pass = {password.current} log = {logout} reset = {getInfo}/>
       : (loggedInUser.current === 'Manufacturer') ? <Manufacturer ct = {contractInstance.current} info = {Info} account = {accounts.current[0]} id = {username.current} pass = {password.current} log = {logout} reset = {getInfo}/>
       : (loggedInUser.current === 'DGST') ? <SupplyM ct = {contractInstance.current} info = {Info} account = {accounts.current[0]} id = {username.current} pass = {password.current} log = {logout} reset = {getInfo}/>
       : (loggedInUser.current === 'Admin') ? <Admin ct = {contractInstance.current} info = {Info} account = {accounts.current[0]} id = {username.current} pass = {password.current} log = {logout} reset = {getInfo}/> : <h1>Invalid Login</h1>}
        
    </div>
  );
}

export default App;
