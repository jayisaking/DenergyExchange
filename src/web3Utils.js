// const { ecrecover } = require("ethereumjs-util/dist/signature");
const ethers = require("ethers");
const contractConfigs = require("./contractConfig.json");

// function bigintToTuple(x, n, k) {
//   let mod = 2n ** BigInt(n);
//   // let ret's length be k, and each element is 0n
//   let ret = new Array(k).fill(0n);
//   let x_temp = BigInt(x);
//   for (var idx = 0; idx < ret.length; idx++) {
//     ret[idx] = x_temp % mod;
//     x_temp = x_temp / mod;
//   }
//   return ret;
// }
// function pubKeyTo2Tuple(pubkey, n, k) {
//   pubkey = BigInt(pubkey);
//   let mod = 2n ** BigInt(n);
//   let ret = [new Array(k).fill(0n), new Array(k).fill(0n)];
//   let temp = pubkey;
//   for (var idx = 1; idx >= 0; idx--) {
//     for (var jdx = 0; jdx < ret[idx].length; jdx++) {
//       ret[idx][jdx] = temp % mod;
//       temp = temp / mod;
//     }
//   }
//   return ret;
// }
// function bigNumberToBigInt(bigNumber) {
//   return BigInt(bigNumber._hex);
// }
// export function getPublicKey(r, s, v, msgHash) {
//   function hexToBuffer(hex) {
//     // first convert to Uint8Array with length 32
//     const hexArray = hex
//       .split("0x")[1]
//       .match(/.{1,2}/g)
//       .map((byte) => parseInt(byte, 16));
//     const uint8Array = new Uint8Array(hexArray);
//     // then convert to Buffer
//     return Buffer.from(uint8Array);
//   }
//   const rBuffer = hexToBuffer(r);
//   const sBuffer = hexToBuffer(s);
//   const msgHashBuffer = hexToBuffer(msgHash);
//   const vInt = parseInt(v, 16);
//   return ecrecover(msgHashBuffer, vInt, rBuffer, sBuffer);
// }
// export function uint8ArrayToString(uint8Array) {
//   // convert the array to Hex first
//   const myArr = Array.from(uint8Array);
//   const hexString =
//     "0x" + myArr.map((byte) => byte.toString(16).padStart(2, "0")).join("");
//   return hexString;
// }

export function getContract(abi, contractAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(contractAddress, abi, provider);
}
export async function supply (amount) {
  const contract = getContract(
    contractConfigs.ElectricityToken.abi,
    contractConfigs.ElectricityToken.address
  );

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts");
  const siger = provider.getSigner();
  await contract.connect(siger).supply(amount);

}