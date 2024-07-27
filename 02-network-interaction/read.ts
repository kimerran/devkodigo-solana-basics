import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js'
const connection = new Connection(clusterApiUrl('devnet'))

// 37UmxWZnDREabCPaQ5NWsTqVQiZB8ojw7CgJDch78wQf
const wallet = new PublicKey('37UmxWZnDREabCPaQ5NWsTqVQiZB8ojw7CgJDch78wQf')

async function main() {
    const balance = await connection.getBalance(wallet)
    console.log('balance is ', balance / LAMPORTS_PER_SOL)
}

main()