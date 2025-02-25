import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WalletAddress {
  id: number;
  wallet_address: string;
  provider_name: string;
  created_at: string;
  active: boolean;
  mining_points: number;
  allocated_storage: number;
  estimated_reward: number;
}

export async function getProviderByWalletAddress(walletAddress: string) {
  // Convert to lowercase for case-insensitive comparison
  const normalizedAddress = walletAddress.toLowerCase();
  console.log('Querying with normalized wallet address:', normalizedAddress);

  const { data, error } = await supabase
    .from('wallet_addresses')
    .select('*')
    .ilike('wallet_address', normalizedAddress)
    .single();

  if (error) {
    console.error('Supabase query error:', error);
    throw error;
  }

  if (!data) {
    console.error('No data found for wallet address:', normalizedAddress);
    throw new Error('No provider found for this wallet address');
  }

  console.log('Provider data found:', data);
  return data as WalletAddress;
}

// Deprecated: Use getProviderByWalletAddress instead
export async function getProviderByUniqueId(uniqueId: string) {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('unique_id', uniqueId)
    .single();

  if (error) throw error;
  return data as WalletAddress;
}

export async function updateWalletAddress(walletAddress: string, updates: Partial<WalletAddress>) {
  const { data, error } = await supabase
    .from('wallet_addresses')
    .update(updates)
    .eq('wallet_address', walletAddress)
    .select()
    .single();

  if (error) throw error;
  return data as WalletAddress;
}

export interface MiningData {
  id: number;
  provider_id: number;
  mining_points: number;
  mining_time: string;
  allocated_storage: number;
  updated_at: string;
}

export async function getMiningData(providerId: number) {
  const { data, error } = await supabase
    .from('mining_data')
    .select('*')
    .eq('provider_id', providerId)
    .single();

  if (error) throw error;
  return data as MiningData;
}

export async function updateMiningData(providerId: number, updates: Partial<MiningData>) {
  const { data, error } = await supabase
    .from('mining_data')
    .update(updates)
    .eq('provider_id', providerId)
    .select()
    .single();

  if (error) throw error;
  return data as MiningData;
}