import styles from "../styles/Home.module.css"
import Head from "next/head"
import { Contract, ethers, providers } from "ethers"
import Web3Modal from "web3modal"
import { useState, useEffect } from "react"
import contractabi from "../Abi/Contract.json"
const Contract_address = "0x282D98d2CA89616d233fe15f451BdB31846af581";


export default function Home() {
  const [account, setAccount] = useState("");
  const [walletConnect, setWalletConnected] = useState(false);
  const [numofWhitelist, setNumofWhiteList] = useState(0);
  const [loading, setloading] = useState(false)
  const [joinedWhiteList, setJoinedWhiteList] = useState(false);

  useEffect(() => {
    WalletConnectedorNot();
  }, [])

  const WalletConnectedorNot = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) {
        alert("Please Authorize Whether That To View These Website You Must Have Crypto Wallet Installed")
      }
      else {
        setloading(true)
        let chainid = await ethereum.request({ method: "eth_chainId" });
      let GoerliChainid = '0x5';
      if (chainid !== GoerliChainid) {
         alert("Please Use Goerli Network Only Others Has Deprication Issue")
        return;
      }
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length != 0) {
          const currentacc = accounts[0];
          setAccount(currentacc);
          setWalletConnected(true);
          console.log("Present Connected Account:", currentacc)
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  const Thankfunc=()=>
  {
    return (
      <div className={styles.description}>
        Thanks for joining the Whitelist!
      </div>
    );
  }


  const JointoWhiteList = async () => {

    const { ethereum } = window;

    if (!account && !ethereum && !loading) {
      console.log("Error Occured");
      return;
    }
    else {
      if (joinedWhiteList)
      {
        Thankfunc();
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(Contract_address, contractabi.abi, signer)
      try {
        await Contract.addWhiteListing();
        setNumofWhiteList(numofWhitelist + 1)
        setJoinedWhiteList(true);
      }
      catch (err) {
        if (err.message.includes("User has Already been WhiteListed")) {
          alert("User has Already been WhiteListed")
        }
        else if (err.message.includes("Number of Whitelisting Limit has reached")) {
          alert("Sorry to Say Maximum Participation limit has rached");
        }
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {numofWhitelist} have already joined the Whitelist
          </div>
          <button className={styles.button} onClick={JointoWhiteList}>Join us</button>
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Keshav Poojary | HydraRichie
      </footer>
    </div>
  )

}