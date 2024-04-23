import Button from '@mui/material/Button';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import contractAddress from './contracts/address.json';
import MyExam from './contracts/MyExam.json';

function App() {
  const [address, set_address] = useState(undefined);
  const [contract, set_contract] = useState(undefined);
  const [deposit_amount, set_deposit_amount] = useState('');
  const [withdraw_amount, set_withdraw_amount] = useState('');
  const [history, set_history] = useState([]);

  const connect_wallet = async () => {
    if (!window.ethereum) {
      alert('Please install metamask');
      return;
    }
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const _address = await signer.getAddress();
      set_address(_address);

      const _contract = new Contract(
        contractAddress.address,
        MyExam.abi,
        signer
      );

      set_contract(_contract);

      const _history = await _contract.getDonate();
      set_history(_history);
    } catch (error) {
      console.log(error);
    }
  };

  const deposit_amount_handle = (e) => {
    set_deposit_amount(e.target.value);
  };

  const deposit_handle = async () => {
    await contract.deposit({ value: parseEther(deposit_amount) });
  };

  const withdraw_amount_handle = (e) => {
    set_withdraw_amount(e.target.value);
  };

  const withdraw_handle = async () => {
    await contract.withdraw(parseEther(withdraw_amount));
  };

  const get_donate_handle = async () => {
    const _history = await contract.getDonate();
    set_history(_history);
  };

  return (
    <div>
      <div style={{ margin: '10px' }}>
        <h1>WELCOME TO MY CONTRACT </h1>
        <div>
          <Button variant="contained" onClick={connect_wallet}>
            {!address
              ? 'CONNECT TO WALLET'
              : `${address.slice(0, 4)}...${address.slice(-4)}`}
          </Button>
        </div>
        <br></br>
        <div>
          <h3>You can donate:</h3>
          <Stack direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              onChange={deposit_amount_handle}
              type="number"
              value={deposit_amount}
            />
            <Button
              variant="outlined"
              onClick={deposit_handle}
              style={{ width: '100px' }}
              disabled={contract ? false : true}
            >
              Donate
            </Button>
          </Stack>
        </div>
        <br></br>
        <div>
          <h3>Only for Admin</h3>
          <Stack direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              onChange={withdraw_amount_handle}
              type="number"
              value={withdraw_amount}
            />
            <Button
              variant="outlined"
              style={{ width: '100px' }}
              onClick={withdraw_handle}
              disabled={contract ? false : true}
            >
              Withdraw
            </Button>
          </Stack>
        </div>
        <br></br>
        <div>
          <Stack direction="row" spacing={2}>
            <h4>History donate: </h4>
            <Button
              variant="outlined"
              onClick={get_donate_handle}
              disabled={contract ? false : true}
            >
              Get donate
            </Button>
          </Stack>
          {history.map((item, index) => (
            <div key={index}>
              {index + 1}. {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
