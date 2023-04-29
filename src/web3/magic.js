import { Magic } from "magic-sdk";
import Web3 from "web3";
import dotenv from "dotenv";

dotenv.config();

// Configure Polygon Testnet
const mumbaiNodeOptions = {
  rpcUrl: "https://rpc-mumbai.maticvigil.com/",
  chainId: 80001,
  networkName: "Mumbai Testnet",
};
export const magicMumbai = new Magic("pk_live_651021D283F34999", {
  network: mumbaiNodeOptions,
});
magicMumbai.network = mumbaiNodeOptions;
export const web3Mumbai = new Web3(magicMumbai.rpcProvider);

// Configure Polygon Mainnet
const maticNodeOptions = {
  rpcUrl: "https://rpc-mainnet.maticvigil.com/",
  chainId: 137,
  networkName: "Matic Mainnet",
};
export const magicMatic = new Magic("pk_live_651021D283F34999", {
  network: maticNodeOptions,
});
magicMatic.network = maticNodeOptions;
export const web3Matic = new Web3(magicMatic.rpcProvider);

// Generate and return DID token
export const getDIDToken = async () => {
  try {
    const didToken = await magicMumbai.user.getIdToken({
      lifespan: 60,
    });
    return didToken;
  } catch (error) {
    console.log(error);
  }
};
