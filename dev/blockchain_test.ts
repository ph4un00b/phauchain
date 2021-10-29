// deno-lint-ignore-file
import { create_blockchain, Transaction } from "./blockchain.ts";

const bitcoin = create_blockchain();

const previous_block_hash = "previous-block-hash";
const current_block_data: Transaction[] = [
  {
    amount: 10,
    sender_address: "sender-1",
    recipient_address: "receiver-1",
  },
  {
    amount: 22,
    sender_address: "sender-2",
    recipient_address: "receiver-2",
  },
  {
    amount: 333,
    sender_address: "sender-3",
    recipient_address: "recipient-3",
  },
];

const nonce = 100;
console.log(
  await bitcoin().hash_block({ previous_block_hash, current_block_data, nonce })
);
