import base58 from "bs58"
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

import wallet from './wallet.json'
const loadWallet = (): Web3.Keypair => {
    const decoded = base58.decode(wallet.privatekey)
    return Web3.Keypair.fromSecretKey(decoded)
}

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))

async function main() {
    const TokenMintAddress = 'D2Q99JZBXg9x5MrtBwdo2RZwXYao3HzcoTYefkaajsAx'
    const TokenAccount = '5i2wok4GkyCmNm9w1yHNGWc9pQdRLr24TTtr1q3yAhC4'

    const myKeyPair = loadWallet()

    const mintTokenTx = await token.mintTo(
        connection,
        myKeyPair, // payer of the tx fees
        new Web3.PublicKey(TokenMintAddress), // mint 
        new Web3.PublicKey(TokenAccount), // destination token account
        myKeyPair.publicKey, // mintint authority
        100, // amount in lamports (or corresponding decimal places)
    )
    console.log('mint token tx ', mintTokenTx)
    // mint token tx  4nicBAMruZUW6uqUShofajpAiKb9vB8XJJxE4tDWGBZszajzRSmm45aDkGvPEuq48WmwBdrv2BU2NXjHZoeH1mUU
}

main()