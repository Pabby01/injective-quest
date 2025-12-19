// Custom hook for wallet integration
// Returns safe defaults when wallet is not configured
import { useEffect } from 'react';
import { startQuest, getPlayerState } from '../lib/gameState';

export function useWallet() {
    // Temporarily disabled - return safe defaults
    // This prevents app crashes while cosmos-kit configuration is being fixed

    return {
        address: undefined,
        connect: async () => {
            console.log('Wallet connection temporarily disabled');
        },
        disconnect: async () => {
            console.log('Wallet disconnect temporarily disabled');
        },
        status: 'Disconnected' as const,
        walletName: undefined,
        isConnected: false,
        isConnecting: false,
    };
}
