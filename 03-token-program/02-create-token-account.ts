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
    const TokenAccountFor = '5Eh25gUPJDoNtTd3v6vpZ5VAwmjUUrxN28MpJDCfR2xA'
    const TokenMintAddress = 'D2Q99JZBXg9x5MrtBwdo2RZwXYao3HzcoTYefkaajsAx'
    const myKeyPair = loadWallet()
    const tokenAccount = await token.createAccount(
        connection,
        myKeyPair,
        new Web3.PublicKey(TokenMintAddress),
        new Web3.PublicKey(TokenAccountFor)
    )
    console.log(`Created token account for ${TokenAccountFor}: ${tokenAccount.toBase58()}`)
    // Created token account for 5Eh25gUPJDoNtTd3v6vpZ5VAwmjUUrxN28MpJDCfR2xA: 5i2wok4GkyCmNm9w1yHNGWc9pQdRLr24TTtr1q3yAhC4
}

main()