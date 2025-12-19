// Wallet Connect Button Component
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

export function WalletConnectButton() {
    // Wallet temporarily disabled
    return (
        <Button
            variant="glass"
            size="default"
            disabled
            className="gap-2 opacity-50"
            title="Wallet connection coming soon"
        >
            <Wallet className="w-4 h-4" />
            Connect Wallet (Coming Soon)
        </Button>
    );
}
