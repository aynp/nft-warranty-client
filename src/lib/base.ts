import { ethers } from 'ethers';

const API_URL = import.meta.env.VITE_API_URL;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

import * as contract from '../artifacts/contracts/WarrentyNFT.sol/WarrentyNFT.json';

const provider = new ethers.providers.JsonRpcProvider(API_URL);

export const wallet = new ethers.Wallet(privateKey, provider);

const abi = contract.abi;

const Contract = new ethers.Contract(contractAddress, abi, wallet);

export default Contract;
