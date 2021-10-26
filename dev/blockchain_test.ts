import { create_blockchain } from "./blockchain.ts";

const bitcoin = create_blockchain();

bitcoin.create_new_block({
  nonce: 1111,
  previous_block_hash: "prev_dummy_hash",
  hash: "dummy_hash",
});

bitcoin.create_new_block({
  nonce: 2222,
  previous_block_hash: "2prev_dummy_hash",
  hash: "2dummy_hash",
});

bitcoin.create_new_block({
  nonce: 3333,
  previous_block_hash: "3prev_dummy_hash",
  hash: "3dummy_hash",
});

console.log(bitcoin);
