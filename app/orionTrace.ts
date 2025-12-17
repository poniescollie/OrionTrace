// app/orionTrace.ts
import React, { useMemo, useState } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { Connected } from "@coinbase/onchainkit/connected";
import { createPublicClient, http, formatEther, type Address } from "viem";
import { base, baseSepolia } from "viem/chains";

type NetworkKey = "base" | "baseSepolia";

const RPC = {
  base: "https://mainnet.base.org",
  baseSepolia: "https://sepolia.base.org",
};

const EXPLORER = {
  base: "https://basescan.org",
  baseSepolia: "https://sepolia.basescan.org",
};

const CHAIN_ID = {
  base: 8453,
  baseSepolia: 84532,
};

function isAddress(v: string): v is Address {
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim());
}

export default function OrionTrace() {
  const [network, setNetwork] = useState<NetworkKey>("baseSepolia");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Idle");
  const [rpcChainId, setRpcChainId] = useState<number | null>(null);
  const [block, setBlock] = useState<bigint | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);

  const chain = network === "base" ? base : baseSepolia;

  const client = useMemo(
    () =>
      createPublicClient({
        chain,
        transport: http(RPC[network]),
      }),
    [chain, network]
  );

  async function runTrace() {
    setStatus("Tracing Base state…");

    const [cid, bn] = await Promise.all([
      client.getChainId(),
      client.getBlockNumber(),
    ]);

    setRpcChainId(cid);
    setBlock(bn);

    if (isAddress(address)) {
      const bal = await client.getBalance({ address });
      setBalance(bal);
    } else {
      setBalance(null);
    }

    setStatus("Done");
  }

  return (
    <OnchainKitProvider chain={chain}>
      <div style={{ maxWidth: 900, margin: "48px auto", fontFamily: "system-ui" }}>
        <h1>OrionTrace — Built for Base</h1>

        <div style={{ marginBottom: 12 }}>
          <label>
            Network:&nbsp;
            <select value={network} onChange={(e) => setNetwork(e.target.value as NetworkKey)}>
              <option value="baseSepolia">Base Sepolia (84532)</option>
              <option value="base">Base Mainnet (8453)</option>
            </select>
          </label>
        </div>

        <Wallet />
        <Connected>
          <input
            placeholder="Address to trace"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 10 }}
          />
        </Connected>

        <button onClick={runTrace} style={{ marginTop: 14 }}>
          Run Trace
        </button>

        <div style={{ marginTop: 18, lineHeight: 1.6 }}>
          <div>Status: {status}</div>
          <div>Expected chainId: {CHAIN_ID[network]}</div>
          <div>RPC chainId: {rpcChainId ?? "—"}</div>
          <div>Latest block: {block?.toString() ?? "—"}</div>
          <div>Native balance: {balance ? `${formatEther(balance)} ETH` : "—"}</div>
          <div>Explorer: {EXPLORER[network]}</div>
        </div>
      </div>
    </OnchainKitProvider>
  );
}
