import { browser } from '$app/env';
import { ethers } from 'ethers';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

import * as contract from '../artifacts/contracts/WarrentyNFT.sol/WarrentyNFT.json';

// const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_URL);

let Contract: any, ContractWithSigner: any;

if (browser) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  await provider.send('eth_requestAccounts', []);

  const signer = provider.getSigner();

  const abi = contract.abi;

  Contract = new ethers.Contract(contractAddress, abi, provider);
  ContractWithSigner = (Contract as any).connect(signer);
}

export default Contract;
export { ContractWithSigner };
