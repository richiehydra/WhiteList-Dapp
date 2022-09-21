const {ethers}=require("hardhat");

async function main  ()
{
const Whitelist=await ethers.getContractFactory("WhiteList");

const DeployedContract=await Whitelist.deploy(10);

await DeployedContract.deployed();

console.log("The Contract Address Deployed at the",DeployedContract.address);

}
main()
.then(()=>process.exit(0))
.catch((err)=>
{
  process.exit(1)
});