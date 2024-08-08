import * as Web3 from '@solana/web3.js'
import base58 from 'bs58'

import keys from './wallet.json' // check wallet.sample.json
const PRIVATE_KEY = keys.privatekey

async function main() {
    const decoded = base58.decode(PRIVATE_KEY)
    const keyPair = Web3.Keypair.fromSecretKey(decoded)
    const destination = new Web3.PublicKey('AA9V2fkKunvJ95FdCT7geqQhsESwMh9ufpTqzDRGn8sk')
    const AMOUNT_IN_SOL = 0.1

    const instruction = Web3.SystemProgram.transfer({
        fromPubkey: keyPair.publicKey,
        toPubkey: destination,
        lamports: AMOUNT_IN_SOL * Web3.LAMPORTS_PER_SOL
    })

    const transaction = new Web3.Transaction()
    transaction.add(instruction)

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))

    const txSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [keyPair])
    console.log('txHash', txSignature)
}

main()