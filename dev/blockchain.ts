export function create_blockchain() {
  const chain: Block[] = [];
  let new_transactions: unknown[] = [];

  type Block = {
    index: number;
    timestamp: number;
    transactions: unknown[];
    nonce: number;
    hash: string;
    previous_block_hash: string;
  };

  function create_new_block({
    nonce,
    previous_block_hash,
    hash,
  }: {
    nonce: number;
    previous_block_hash: string;
    hash: string;
  }) {
    const new_block: Block = {
      index: chain.length + 1,
      timestamp: Date.now(),
      transactions: new_transactions,
      nonce,
      hash,
      previous_block_hash,
    };

    new_transactions = [];
    chain.push(new_block);

    return new_block;
  }

  return Object.freeze({
    create_new_block,
    chain,
    new_transactions,
  });
}
