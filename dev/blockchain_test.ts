// deno-lint-ignore-file
import { create_blockchain } from "./blockchain.ts";

const bitcoin = create_blockchain();

bitcoin().create_new_block({
  nonce: 1111,
  previous_block_hash: "prev_dummy_hash",
  hash: "dummy_hash",
});

bitcoin().create_new_transaction({
  amount: 100,
  sender_address: "dios_sender_address",
  recipient_address: "juan_recipient_address",
});

bitcoin().create_new_block({
  nonce: 2222,
  previous_block_hash: "2prev_dummy_hash",
  hash: "2dummy_hash",
});

bitcoin().create_new_transaction({
  amount: 50,
  sender_address: "dios_sender_address",
  recipient_address: "juan_recipient_address",
});

bitcoin().create_new_transaction({
  amount: 300,
  sender_address: "dios_sender_address",
  recipient_address: "juan_recipient_address",
});

bitcoin().create_new_transaction({
  amount: 2000,
  sender_address: "dios_sender_address",
  recipient_address: "juan_recipient_address",
});

bitcoin().create_new_block({
  nonce: 3333,
  previous_block_hash: "3prev_dummy_hash",
  hash: "3dummy_hash",
});

console.log(bitcoin());
