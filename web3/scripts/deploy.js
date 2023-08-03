const { ethers } = require("hardhat");

async function main() {
  const ElectricityToken = await ethers.getContractFactory("ElectricityToken");

  // Start deployment, returning a promise that resolves to a contract object
  const token = await ElectricityToken.deploy();   
  console.log("Contract deployed to address:", await token.getAddress());
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });