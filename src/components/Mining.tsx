import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CpuChipIcon, CubeIcon, BoltIcon, ArrowTrendingUpIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { getProviderByWalletAddress, getProviderByUniqueId, getMiningData, updateMiningData, type MiningData, type WalletAddress } from '../lib/supabase';

type Provider = WalletAddress & { is_active?: boolean };

interface MiningStats extends MiningData {
  uptime?: string;
}

const initialMiningStats = [
  { name: 'Storage Power', value: '125 TB', icon: CloudArrowUpIcon },
  { name: 'Files Stored', value: '1,234', icon: CubeIcon },
  { name: 'Network Storage', value: '3.45 PB', icon: BoltIcon },
  { name: 'Earnings (24h)', value: '45.3 AAI', icon: ArrowTrendingUpIcon },
];

function Mining() {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState<Provider | null>(null);
  const [miningData, setMiningData] = useState<MiningStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMiningStats = async () => {
    if (!walletAddress) return;
    
    // Basic wallet address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      setError('Invalid wallet address format. Please enter a valid Ethereum address');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching provider data for wallet:', walletAddress);
      const providerData = await getProviderByWalletAddress(walletAddress);
      console.log('Provider data received:', providerData);
      
      if (!providerData) {
        throw new Error('No provider found for this wallet address. Please make sure you have registered as a provider.');
      }
      
      if (!providerData.id) {
        throw new Error('Invalid provider data: missing ID. Please contact support.');
      }
      
      console.log('Fetching mining data for provider ID:', providerData.id);
      const miningStats = await getMiningData(providerData.id);
      console.log('Mining stats received:', miningStats);
      
      if (!miningStats) {
        throw new Error('No mining data found. Please initialize your mining account first.');
      }
      
      // Validate mining data structure with specific error messages
      if (typeof miningStats.mining_points !== 'number') {
        throw new Error('Invalid mining data: missing mining points');
      }
      if (typeof miningStats.allocated_storage !== 'number') {
        throw new Error('Invalid mining data: missing storage allocation');
      }
      if (!miningStats.mining_time) {
        throw new Error('Invalid mining data: missing mining time');
      }
      if (!miningStats.updated_at) {
        throw new Error('Invalid mining data: missing update timestamp');
      }
      
      // Calculate uptime if mining_time exists
      const miningStatsWithUptime = {
        ...miningStats,
        uptime: miningStats.mining_time ? calculateUptime(new Date(miningStats.mining_time)) : '0h 0m'
      };

      setProvider({ ...providerData, is_active: true });
      setMiningData(miningStatsWithUptime);
    } catch (err) {
      console.error('Detailed error:', err);
      let errorMessage = 'Failed to load mining data. ';
      
      if (err instanceof Error) {
        // Handle Supabase specific errors
        if (err.message.includes('JWT')) {
          errorMessage += 'Authentication failed. Please try again.';
        } else if (err.message.includes('not found')) {
          errorMessage += 'Provider not found. Please check your wallet address.';
        } else {
          errorMessage += err.message;
        }
      } else {
        errorMessage += 'Please check your wallet address and try again.';
      }
      
      setError(errorMessage);
      setProvider(null);
      setMiningData(null);
    } finally {
      setLoading(false);
    }
  };

  const calculateUptime = (startTime: Date): string => {
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const toggleMining = async () => {
    if (!provider || !miningData) return;
    
    try {
      const currentTime = new Date().toISOString();
      const updates = {
        mining_points: miningData.mining_points + (provider.is_active ? -10 : 10),
        mining_time: currentTime,
        updated_at: currentTime,
        allocated_storage: miningData.allocated_storage
      };
      
      const updatedData = await updateMiningData(provider.id, updates);
      const updatedDataWithUptime = {
        ...updatedData,
        uptime: calculateUptime(new Date(currentTime))
      };
      
      setMiningData(updatedDataWithUptime);
      setProvider({ ...provider, is_active: !provider.is_active });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update mining status');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Storage Mining Dashboard</h2>
      <p className="text-gray-400">Monitor your storage mining performance and earnings in AAI tokens</p>

      <div className="card p-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">Wallet Address</label>
        <div className="flex gap-4">
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your wallet address"
            className="flex-1 bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent"
          />
          <button 
            className="btn-primary"
            onClick={loadMiningStats}
            disabled={loading || !walletAddress}
          >
            {loading ? 'Loading...' : 'Load Stats'}
          </button>
        </div>
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Storage Power', value: `${provider?.allocated_storage || 0} GB`, icon: CloudArrowUpIcon },
          { name: 'Mining Points', value: `${provider?.mining_points || 0}`, icon: CubeIcon },
          { name: 'Estimated Reward', value: `${provider?.estimated_reward || 0} AAI`, icon: BoltIcon },
          { name: 'Last Updated', value: provider?.created_at ? new Date(provider.created_at).toLocaleString() : 'Never', icon: ArrowTrendingUpIcon },
        ].map((stat, index) => (
          <motion.div
            key={stat.name}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <stat.icon className="w-8 h-8 text-accent mr-3" />
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card space-y-4">
          <h3 className="text-xl font-semibold">Storage Mining Controls</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Storage Mining Status</span>
              <span className={`font-semibold ${provider?.is_active ? 'text-green-500' : 'text-red-500'}`}>
                {provider?.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Uptime</span>
              <span>{miningData?.uptime || '0h 0m'}</span>
            </div>
            <button 
              className="btn-primary w-full" 
              onClick={toggleMining}
              disabled={!provider}
            >
              {provider?.is_active ? 'Stop Storage Mining' : 'Start Storage Mining'}
            </button>
          </div>
        </div>

        <div className="card space-y-4">
          <h3 className="text-xl font-semibold">Storage Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Files Uploaded</span>
              <span>{miningData?.mining_points || 0} points</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Storage Utilization</span>
              <span>{miningData?.allocated_storage || 0} GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total AAI Earned</span>
              <span>{miningData?.mining_time || '0 hours'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mining;