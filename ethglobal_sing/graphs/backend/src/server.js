const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const { config } = require('@onflow/fcl');
const { send } = require('@onflow/transport-http');
const { sansPrefix, withPrefix } = require('@onflow/util-address');
const t = require('@onflow/types');
const fcl = require('@onflow/fcl');

const app = express();
app.use(cors());
app.use(express.json());

// Configure FCL
config({
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'flow.network': 'testnet',
  'app.detail.title': 'Mintly Rewards',
  'app.detail.icon': 'https://placekitten.com/g/200/200',
})
  .put('sdk.transport', send)
  .put('0xMintlyRewards', '0x7f68aedfa0aad77b'); 

// Ethereum contract setup
const ethProvider = new ethers.providers.JsonRpcProvider('YOUR_ETHEREUM_RPC_URL');
const ethContractAddress = 'YOUR_ETH_RECEIVER_CONTRACT_ADDRESS';
const ethContractABI = [
  "event PurchaseReceived(address indexed buyer, uint256 amount, string partner)",
  "function purchase(string memory partner) public payable"
];
const ethContract = new ethers.Contract(ethContractAddress, ethContractABI, ethProvider);

// Create a purchase
app.post('/purchase', async (req, res) => {
  const { amount, partner, userAddress } = req.body;
  
  try {
    // Convert ETH to Flow tokens (this is a placeholder, implement actual conversion)
    const flowAmount = ethToFlow(amount);

    // Record purchase on Flow blockchain
    const transactionId = await fcl.send([
      fcl.transaction`
        import MintlyRewards from 0xMintlyRewards

        transaction(amount: UFix64, partner: String, purchaser: Address) {
          prepare(signer: AuthAccount) {
            let purchaseID = MintlyRewards.createPurchase(purchaser: purchaser, amount: amount, partner: partner)
          }
        }
      `,
      fcl.args([
        fcl.arg(flowAmount.toFixed(8), fcl.t.UFix64),
        fcl.arg(partner, fcl.t.String),
        fcl.arg(userAddress, fcl.t.Address)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    const pointsEarned = flowAmount * 0.05; // 5% of purchase amount
    res.json({ success: true, transactionId, pointsEarned });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper function to convert ETH to Flow tokens (placeholder)
function ethToFlow(ethAmount) {
  // Implement actual conversion logic here
  return ethAmount * 100; // Placeholder conversion rate
}

// Listen for Ethereum purchase events
ethContract.on("PurchaseReceived", async (buyer, amount, partner, event) => {
  console.log(`Purchase received from ${buyer} for ${ethers.utils.formatEther(amount)} ETH`);
  // Here you can trigger additional logic, such as updating a database
});

// Get points balance
app.get('/balance/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const result = await fcl.send([
      fcl.script`
        import MintlyRewards from 0xMintlyRewards

        pub fun main(address: Address): UFix64 {
          return MintlyRewards.getPointsBalance(account: address)
        }
      `,
      fcl.args([fcl.arg(withPrefix(address), t.Address)]),
    ]).then(fcl.decode);

    res.json({ success: true, balance: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Redeem points
app.post('/redeem', async (req, res) => {
  const { amount } = req.body;

  try {
    const result = await fcl.send([
      fcl.transaction`
        import MintlyRewards from 0xMintlyRewards

        transaction(amount: UFix64) {
          prepare(acct: AuthAccount) {
            MintlyRewards.redeemPoints(amount: amount)
          }
        }
      `,
      fcl.args([fcl.arg(amount, t.UFix64)]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999),
    ]).then(fcl.decode);

    res.json({ success: true, transactionId: result.transactionId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});