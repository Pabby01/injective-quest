// Wallet provider configuration for Injective
// Made optional to prevent blocking app launch
import { ReactNode } from 'react';

export interface WalletProviderProps {
  children: ReactNode;
}

// Simplified wallet provider that doesn't block app launch
export function WalletProvider({ children }: WalletProviderProps) {
  // For now, just pass through children without wallet functionality
  // This prevents the app from crashing while we debug cosmos-kit configuration
  return <>{children}</>;
}
