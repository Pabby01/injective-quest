import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLatestBlock, getNetworkStatus, formatBlockTime, formatNumber, BlockInfo, NetworkStatus } from "@/lib/injectiveRpc";
import { Activity, Cpu, Clock, Hash } from "lucide-react";

interface LiveDataDisplayProps {
  dataPoint?: string;
}

export function LiveDataDisplay({ dataPoint }: LiveDataDisplayProps) {
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [block, network] = await Promise.all([
        getLatestBlock(),
        getNetworkStatus()
      ]);
      setBlockInfo(block);
      setNetworkStatus(network);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const dataItems = [
    {
      icon: Hash,
      label: "Chain ID",
      value: blockInfo?.chainId || "Loading...",
      highlight: dataPoint === "chainId"
    },
    {
      icon: Activity,
      label: "Block Height",
      value: blockInfo ? formatNumber(blockInfo.blockHeight) : "Loading...",
      highlight: dataPoint === "blockHeight"
    },
    {
      icon: Clock,
      label: "Block Time",
      value: blockInfo ? formatBlockTime(blockInfo.blockTime) : "Loading...",
      highlight: dataPoint === "blockTime"
    },
    {
      icon: Cpu,
      label: "Network",
      value: networkStatus?.nodeInfo.network || "Loading...",
      highlight: dataPoint === "network"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs font-space text-muted-foreground uppercase tracking-wider">
          Live Injective Data
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dataItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`p-3 rounded-lg transition-all duration-300 ${
              item.highlight 
                ? "bg-primary/20 border border-primary/40 shadow-[0_0_20px_hsl(180_100%_50%_/_0.2)]" 
                : "bg-card/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <item.icon className={`w-4 h-4 ${item.highlight ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {item.label}
              </span>
            </div>
            <p className={`font-mono text-sm truncate ${item.highlight ? "text-primary font-bold" : "text-foreground"}`}>
              {loading ? "..." : item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
