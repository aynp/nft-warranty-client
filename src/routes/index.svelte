<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { ethers } from 'ethers';

  const API_URL = import.meta.env.VITE_API_URL;
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  const contractAddress = '0xDb9EDaF34b7D96F1693c254d01306AB27157aE01';

  import * as contract from '../artifacts/contracts/WarrentyNFT.sol/WarrentyNFT.json';

  const provider = new ethers.providers.JsonRpcProvider(API_URL);

  const wallet = new ethers.Wallet(privateKey, provider);

  const abi = contract.abi;

  const myNftContract = new ethers.Contract(contractAddress, abi, wallet);

  const tokenUri =
    'https://gateway.pinata.cloud/ipfs/QmettvXFnJNcmKngos1wYwohb7LtLB272z5sjzK2Eb5Qwd';

  const mintNFT = async () => {
    const tx = await myNftContract.mintWarrentyNFT(
      wallet.address,
      1,
      1,
      2,
      tokenUri
    );
    await tx.wait();
    console.log(tx);
  };
</script>

<svelte:head>
  <title>Warrenty NFT</title>
  <meta name="description" content="Warrenty NFT Homepage" />
</svelte:head>

<section>
  <h1>HomePage</h1>
  <a href="/admin">Admin Panel</a>
  <a href="/seller">Seller Panel</a>
  <a href="/about">About</a>

  <button on:click={mintNFT}>MINT</button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }
</style>
