import Web3 from 'web3';
import {DMR_ADDRESS,DMR_ABI} from '../config.js';
async function InitialiseWeb3(){
    await window.ethereum.enable();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    const DMR = await new web3.eth.Contract(DMR_ABI,DMR_ADDRESS);
    return [DMR,accounts];
}




export default InitialiseWeb3;