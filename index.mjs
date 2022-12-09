import { ThirdwebSDK } from '@thirdweb-dev/sdk/solana';

async function main() {
  // setup
  const NETWORK = "devnet";
  const sdk = ThirdwebSDK.fromPrivateKey(NETWORK, "54mt653dBoTR8gKFboayQYpdSEzuFTrwi1xhX9TzWmhf5dBQyR9P4cdLYXUWBm2URLDwyMnxsR3ko1ipnbbbyCG3");

  // deployment
  const deployed = await sdk.deployer.createNftCollection({
    name: "Testing Collection",
    description: "My personal NFT collection.",
    symbol: "MNFT"
  });

  // minting logic
  const nftCollection = await sdk.getNFTCollection(deployed);

  const nft = await nftCollection.mintTo("5xPbVLKbdoeazh6Jx88KrqCr7pXsdoVFdcoyPD4yR5Zd", {
    name: "NFT testing",
    description: "1234",
    symbol: "M"
  });

  const bulkMinting = await nftCollection.mintAdditionalSupply(nft,5)

  // output
  console.log("Collection deployed to: ", deployed);
  console.log("Minted nft: ", nft);
  console.log("Bulk address", bulkMinting);
}

main()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });