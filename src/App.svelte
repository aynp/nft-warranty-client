<script>
  import User from './User.svelte';
  import { ethers } from 'ethers';

  const INFURA_ID = 'fd27d57364a3484987a1de5ee6e755fd';
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`
  );
  // function calls in solidity

  // Let's work with contracts and events
  const ABI = [
    'function balanceOf(address) view returns (uint256)',
    'function ownerOf(uint256) view returns (address)',

    'event Transfer(address from, address to, uint256 tokenId)',
  ];

  const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // This will keep the address of the contract
  const contract = new ethers.Contract(address, ABI, provider);

  const main = async () => {
    const block = await provider.getBlockNumber(); // current block
    const filter = contract.filters.Transfer(); // filter for events
    const transferEvents = await contract.queryFilter(
      filter,
      block - 10,
      block
    );
    console.log(transferEvents);
  };

  main();
</script>

<User />

<div>Hello World</div>
