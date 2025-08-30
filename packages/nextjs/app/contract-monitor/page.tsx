"use client";

import { useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance, useContractRead, useWatchContractEvent } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

export default function ContractMonitor() {
  // Nome do contrato exatamente como no deploy.json
  // Aqui forçamos o type assertion pra contornar o typing do scaffold
  const contractName = "SimpleDeFiToken" as const;

  // Conta conectada
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  // Info do contrato (pega ABI e address do deploy)
  const { data: deployedContractData } = useDeployedContractInfo("SimpleDeFiToken" as any);
  const contractAddress = deployedContractData?.address;
  const contractAbi = deployedContractData?.abi;

  // Leituras básicas ERC20
  const { data: name } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "name",
  });

  const { data: symbol } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "symbol",
  });

  const { data: totalSupply } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "totalSupply",
  });

  const { data: myBalance } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  // Guardar últimos eventos Transfer
  const [events, setEvents] = useState<{ from?: string; to?: string; value?: bigint; blockNumber?: bigint }[]>([]);

  useWatchContractEvent({
    address: contractAddress,
    abi: contractAbi,
    eventName: "Transfer",
    onLogs: (logs: any[]) => {
      const newEvents = logs.map((log: any) => ({
        from: log.args?.from as string,
        to: log.args?.to as string,
        value: log.args?.value as bigint,
        blockNumber: log.blockNumber as bigint,
      }));
      setEvents(prev => [...newEvents, ...prev].slice(0, 10));
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Contract Monitor</h1>

      {!contractAddress ? (
        <p className="text-red-500">
          Contrato {contractName} não encontrado. Rode <code>yarn deploy</code> primeiro.
        </p>
      ) : (
        <>
          <div className="space-y-2">
            <p>
              <strong>Contract:</strong> {contractAddress}
            </p>
            <p>
              <strong>Name:</strong> {name as string}
            </p>
            <p>
              <strong>Symbol:</strong> {symbol as string}
            </p>
            <p>
              <strong>Total Supply:</strong> {totalSupply ? formatUnits(totalSupply as bigint, 18) : "—"}
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Your Address:</strong> {address}
            </p>
            <p>
              <strong>Your ETH Balance:</strong> {balance ? formatUnits(balance.value, balance.decimals) : "—"}
            </p>
            <p>
              <strong>Your Token Balance:</strong> {myBalance ? formatUnits(myBalance as bigint, 18) : "—"}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Últimos eventos Transfer</h2>
            <ul className="space-y-1">
              {events.map((ev, i) => (
                <li key={i} className="text-sm bg-gray-100 p-2 rounded">
                  From: {ev.from} → To: {ev.to} | Value: {formatUnits(ev.value ?? 0n, 18)} | Block:{" "}
                  {ev.blockNumber?.toString()}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
