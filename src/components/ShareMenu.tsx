// Share Menu Component for Completion Screen
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, MessageCircle, Copy, Download, Check } from "lucide-react";
import { shareToTwitter, shareToTelegram, copyToClipboard, downloadCertificate, ShareData } from "@/lib/shareUtils";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareMenuProps {
    shareData: ShareData;
}

export function ShareMenu({ shareData }: ShareMenuProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const success = await copyToClipboard(shareData);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="hero" size="lg" className="gap-2">
                    <Share2 className="w-5 h-5" />
                    Share Results
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-strong border-primary/20 min-w-[200px]" align="center">
                <DropdownMenuItem
                    onClick={() => shareToTwitter(shareData)}
                    className="cursor-pointer gap-3"
                >
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                    <span>Share on Twitter</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => shareToTelegram(shareData)}
                    className="cursor-pointer gap-3"
                >
                    <MessageCircle className="w-4 h-4 text-[#0088cc]" />
                    <span>Share on Telegram</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={handleCopy}
                    className="cursor-pointer gap-3"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-success" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                    <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => downloadCertificate(shareData)}
                    className="cursor-pointer gap-3"
                >
                    <Download className="w-4 h-4" />
                    <span>Download Certificate</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
