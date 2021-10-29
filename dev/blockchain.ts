// deno-lint-ignore-file camelcase
import { crypto } from "https://deno.land/std@0.113.0/crypto/mod.ts";
import { encode } from "https://deno.land/std@0.113.0/encoding/hex.ts";

const te = (s: string) => new TextEncoder().encode(s);
const td = (d: Uint8Array) => new TextDecoder().decode(d);

export type Transaction = {
  amount: number;
  sender_address: string;
  recipient_address: string;
};

export function create_blockchain() {
  const chain: Block[] = [];
  let pending_transactions: Transaction[] = [];

  type Block = {
    index: number;
    timestamp: number;
    transactions: Transaction[];
    nonce: number;
    hash: string;
    previous_block_hash: string;
  };

  async function hash_block(spec: {
    previous_block_hash: string;
    current_block_data: Transaction[];
    nonce: number;
  }) {
    const { previous_block_hash, current_block_data, nonce } = spec;
    const data = `${previous_block_hash}${nonce.toString()}${JSON.stringify(
      current_block_data
    )}`;

    const hash: ArrayBuffer = await crypto.subtle.digest("SHA-256", te(data));

    return td(encode(new Uint8Array(hash)));
  }

  function create_new_transaction({
    amount,
    sender_address,
    recipient_address,
  }: {
    amount: number;
    sender_address: string;
    recipient_address: string;
  }): number {
    const tx: Transaction = {
      amount,
      sender_address,
      recipient_address,
    };

    pending_transactions.push(tx);
    //  console.log("push", pending_transactions);

    const { index: last_transaction_index } = get_last_block();

    const new_transaction_index = last_transaction_index + 1;

    return new_transaction_index;
  }

  function get_last_block(): Block {
    return chain[chain.length - 1];
  }

  function create_new_block({
    nonce,
    previous_block_hash,
    hash,
  }: {
    nonce: number;
    previous_block_hash: string;
    hash: string;
  }): Block {
    const new_block: Block = {
      index: chain.length + 1,
      timestamp: Date.now(),
      transactions: pending_transactions,
      nonce,
      hash,
      previous_block_hash,
    };

    pending_transactions = [];
    chain.push(new_block);

    return new_block;
  }

  return function () {
    return Object.freeze({
      hash_block,
      create_new_block,
      create_new_transaction,
      get_last_block,
      chain,
      pending_transactions,
    });
  };
}
