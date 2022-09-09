import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { GiCheckMark } from 'react-icons/gi'; // Tickmark icon in connect wallet button

// import Button from "react-bootstrap/Button";
import { fetchData } from "./redux/data/dataActions";
import styled from "styled-components";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";
import "./App.css";
import logo from "./images/Dudelz_logo.png";
import logosmall from "./images/BHL_Logo_Vector.svg";
import footerlogo from "./images/upcomingnft-maillogo-b.png";
import Timer from "./timer";
import DefaultTimer from "./defaultTimer";
export const StyledLogo = styled.img`
  width: 320px;
  margin-top: -40px;
  @media (max-width: 1080px) {
    width: 320px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const Heading = styled.h1`
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 2rem;
  text-align: center;
  padding-bottom: 1rem;
`;

export const Heading2 = styled.h1`
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 1rem;
  text-align: center;
  padding-bottom: 2rem;
`;

export const Heading3 = styled.h1`
  color: rgb(219, 51, 125);
  text-transform: uppercase;

  font-size: 50pt;
  font-family: Ultraquick;
  font-weight: 500;
  text-align: center;
  padding-bottom: 20px;
`;

export const Heading4 = styled.h1`
  color: #e65ea2;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 30pt;
  font-weight: 900;
  text-align: center;
  padding-bottom: 0rem;
`;

const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ApprovalCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalToCurrentOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ApproveToCaller",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BalanceQueryForZeroAddress",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			}
		],
		"name": "goldlistMint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_users",
				"type": "address[]"
			}
		],
		"name": "GoldlistUsers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MintToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintZeroQuantity",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnerQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferFromIncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToNonERC721ReceiverImplementer",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToZeroAddress",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_baseTokenUri",
				"type": "string"
			}
		],
		"name": "setTokenUri",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mintAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			}
		],
		"name": "teamMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleGoldListSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "togglePause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "togglePublicSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GOLDLIST_SALE_PRICE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "goldlistedAddresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "goldListSale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "isGoldlisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_GOLDLIST_MINT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_PUBLIC_MINT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_SUPPLY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PUBLIC_SALE_PRICE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publicSale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "teamMinted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalGoldlistMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalPublicMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let account = null;
let contract = null;

const ADDRESS = "0x879754ee0B08149Fbe2B181522215b28010c2e2e";

//Moved the connectWallet function inside App component so that state variable could be updated when wallet connected.
/*async function connectwallet() {
		if (window.ethereum) {
    		var web3 = new Web3(window.ethereum);
    		await window.ethereum.send("eth_requestAccounts");
    		var accounts = await web3.eth.getAccounts();
			account = accounts[0];
			setWalletAddress(account);
    		contract = new web3.eth.Contract(ABI, ADDRESS);
  		}
	}*/

async function mint() {
	if (window.ethereum) {
	var afterMintMessage = document.querySelector("[id=after-mint-message]"); // To add notification message
	afterMintMessage.className = ""; // To clear the styles of the message box initially	
    var _quantity = Number(document.querySelector("[name=amount]").value);
    var mintRate = Number(await contract.methods.PUBLIC_SALE_PRICE().call());
	var totalAmount = mintRate * _quantity;
	await contract.methods.mint(_quantity).send({ from: account, value: String(totalAmount) }); // calls async here
	afterMintMessage.innerHTML = "Congratulations, you now own a Dudelz!<br />Head to <a href='https://opensea.io/collection/dudelz-by-jojami'>https://opensea.io/collection/dudelz-by-jojami</a> to check out what who you got."; // Notification message
	afterMintMessage.className += "after-mint-message"; // Class to animate notification message
  }
}

function App() {
  const MAX_SUPPLY = 500;
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  

  const timer_data = { type: "default", time: "9/10/2022 11:00:00 PM" };

  const [toggle, setToggle] = useState(false);
	const [walletToggle, setWalletToggle] = useState(false);
	const [walletAddress, setWalletAddress] = useState("Connect Wallet"); // To update button text after walletconnect
  const [Amount, setAmount] = useState(1);
  const incrementMintAmount = () => {
    let newAmount = Amount + 1;
    if (newAmount > 10) {
      newAmount = 10;
    }
    setAmount(newAmount);
  };

	// Moved this function from outside of App component to update the state value when wallet gets connected
	async function connectwallet() {
		if (window.ethereum) {
			var web3 = new Web3(window.ethereum);
			await window.ethereum.send("eth_requestAccounts");
			var accounts = await web3.eth.getAccounts();
			account = accounts[0];
			setWalletAddress("..." + account.substring(account.length - 4, account.length)); // Set wallet address to the button
			contract = new web3.eth.Contract(ABI, ADDRESS);
  		}
	}
  const decrementMintAmount = () => {
    let newAmount = Amount - 1;
    if (newAmount < 1) {
      newAmount = 1;
    }
    setAmount(newAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
        
  useEffect(() => {
    getData();
  }, [blockchain.account]);
  

  return (
    <body>
      <header>
        <div class="containerheader">
          <div class="logo">
            <a href="https://bountyhunterslodge.com">
              <img class="headerlogo" src={logosmall} alt="logo" />
            </a>
          </div>
			<div class="menu">
            <button
              class={walletToggle ? "wallet-btn active" : "wallet-btn"}
              onClick={() => {
                setWalletToggle((prev) => !prev);
                connectwallet();
              }}
              id="connectWallet"
					  >{walletToggle ? <GiCheckMark /> : ""}{ walletAddress}</button>
          </div>
        </div>
      </header>
      <section>
        {timer_data &&
          (timer_data.type == "default" ? (
            <DefaultTimer endTime={timer_data.time} />
          ) : (
            <Timer startTime={timer_data.time} />
          ))}
        <div class="container">
          <StyledLogo src={logo} />
			  </div>
			  
			  <div className="" id="after-mint-message"></div>  {/* Box for message notification after wallet connect */}

        <div
          class="containermain"
          style={{
            padding: 20,
            borderRadius: 0,
          }}
        >
          <Heading3>
            {totalSupply} / {MAX_SUPPLY}
          </Heading3>
          <div className="mint" id="mint">
            <div className="row">
              {/* <form className="col-lg-30 mt-3"> */}
              <div class="mint-spinner p-6 mx-auto mb-6">
                <div class="input-group input-group-md">
                  <div class="input-group-prepend">
                    <button
                      id="input-spinner-left-button"
                      type="button"
                      onClick={decrementMintAmount}
                    >
                      -
                    </button>
                  </div>
                  <input
                    readonly=""
                    class="form-control"
                    name="amount"
                    value={Amount}
                  />
                  <div class="input-group-append">
                    <button
                      id="input-spinner-right-button"
                      type="button"
                      onClick={incrementMintAmount}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={{ padding: "20px 0" }}>
                  <span className="price-eth">
                    <span className="bold">
                      PRICE<span>: </span>
                    </span>
                    {(0.016 * Amount).toFixed(3)} ETH
                  </span>
                </div>
              </div>
              <button
                class={toggle ? "mint-btn active" : "mint-btn"}
                onClick={() => {
                  setToggle((prev) => !prev);
                  mint();
                }}
              ></button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </section>
	  <div class="footerlogo">
	  		<img class="footerlogo" src={footerlogo} alt="footerlogo" />
	  </div>
    </body>
  );
}

export default App;
