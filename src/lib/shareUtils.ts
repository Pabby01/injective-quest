// Share utilities for social media and completion screen
export interface ShareData {
    score: number;
    totalScore: number;
    chaptersCompleted: number;
    ninjaName: string;
}

export function generateShareText(data: ShareData): string {
    const percentage = Math.round((data.score / data.totalScore) * 100);
    const emoji = percentage === 100 ? '🥷✨' : percentage >= 80 ? '🥷' : '⚔️';

    return `I just completed Injective Ninja Quest! ${emoji}

📊 Score: ${data.score}/${data.totalScore} (${percentage}%)
📚 Chapters: ${data.chaptersCompleted}/5
🎓 Learned about Injective's Layer 1 blockchain

Join the quest: ${window.location.origin}

#Injective #NinjaLabs #Web3 #DeFi`;
}

export function shareToTwitter(data: ShareData) {
    const text = encodeURIComponent(generateShareText(data));
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
}

export function shareToTelegram(data: ShareData) {
    const text = encodeURIComponent(generateShareText(data));
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${text}`;
    window.open(url, '_blank');
}

export function copyToClipboard(data: ShareData): Promise<boolean> {
    const text = generateShareText(data);
    return navigator.clipboard.writeText(text)
        .then(() => true)
        .catch(() => false);
}

// Generate certificate/completion card data
export function generateCertificateData(data: ShareData): string {
    return `
╔═══════════════════════════════════════════╗
║     INJECTIVE NINJA QUEST CERTIFICATE    ║
╠═══════════════════════════════════════════╣
║                                           ║
║  Ninja: ${data.ninjaName.padEnd(30, ' ')} ║
║  Score: ${data.score}/${data.totalScore} (${Math.round((data.score / data.totalScore) * 100)}%)${' '.repeat(20)} ║
║  Chapters Completed: ${data.chaptersCompleted}/5${' '.repeat(20)} ║
║                                           ║
║  You have mastered the fundamentals of   ║
║  Injective's Layer 1 blockchain!         ║
║                                           ║
╠═══════════════════════════════════════════╣
║        Ninja Labs Community 🥷           ║
╚═══════════════════════════════════════════╝
`;
}

export function downloadCertificate(data: ShareData) {
    const certificate = generateCertificateData(data);
    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `injective-ninja-certificate-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
