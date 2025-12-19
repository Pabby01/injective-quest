// Audio Control Button Component
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

export function AudioControl() {
    const { isMuted, toggleMute } = useAudio();

    return (
        <Button
            variant="glass"
            size="icon"
            onClick={toggleMute}
            className="fixed bottom-4 right-4 z-50 h-12 w-12"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
            {isMuted ? (
                <VolumeX className="w-5 h-5" />
            ) : (
                <Volume2 className="w-5 h-5 text-primary" />
            )}
        </Button>
    );
}
