import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";

// Initializing the SDK and passing in the signer 
const sdk = ThirdwebSDK.fromPrivateKey("devnet", "2VckPpaPxNuzQrwzFf6NPFNh8dB9qGzoGBEJi9QRFNrGhPWYvPuUcBnDJbVwHEgkPUtwvoTxdKpjLh3wzUEGXQ3A");

const programMetadata = {
    name: "This is a DROP",
    symbol: "MND",
    description: "This is my NFT Drop",
    itemsAvailable: 3,
    totalSupply: 3
  };
  
  // Here we will get the address of the deployed program by passing
  // the programMetadata in the createNftDrop hook that the sdk provides
  const address = await sdk.deployer.createNftDrop(programMetadata);
  // Logging the address to the terminal console
  console.log("Program Address: ", address);

const metadata = [
    {
      name: "NFT #1",
      description: "My first NFT!",
      properties: [
        {
          name: "kitten",
          value: "very cute!",
        },
      ],
    },
    {
      name: "NFT #2",
      description: "My second NFT!",
      properties: [
        {
          name: "grumpy cat",
          value: "grumpy!",
        },
      ],
    },
    {
      name: "NFT #3",
      description: "My third NFT!",
      properties: [
        {
          name: "Ninja Cat",
          value: "warrior!",
        },
      ],
    },
  ];
  
  const program = await sdk.getNFTDrop(address);
  


  //   And lazy mint NFTs using the above metadata
  const tx = await program.lazyMint(metadata);

  // set your claim conditions
  await program.claimConditions.set({
    maxClaimable: 100,
    price: 0.01,
    startTime: new Date(),
  });

  // get your claim conditions
  const conditions = await program.claimConditions.get();
  console.log(conditions.maxClaimable);
  console.log(conditions.claimedSupply);
    // logging the transaction hash to the console
    console.log(tx);