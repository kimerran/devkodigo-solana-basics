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
    const myKeyPair = loadWallet()

    const tokenMint = await token.createMint(
        connection,
        myKeyPair, // payer
        myKeyPair.publicKey, // mintAuthority
        myKeyPair.publicKey, // freezeAuthority
        9,
        Web3.Keypair.generate() // optional
    )
    console.log('Your token mint address is ',tokenMint.toBase58());
    // Mint Address: D2Q99JZBXg9x5MrtBwdo2RZwXYao3HzcoTYefkaajsAx
}

main()
