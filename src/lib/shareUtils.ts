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

// Generate visual certificate as PNG image
export function downloadCertificate(data: ShareData) {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d')!;

    // Background gradient (dark cyberpunk)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a0118');
    gradient.addColorStop(0.5, '#1a0b2e');
    gradient.addColorStop(1, '#0a0118');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add glow border
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 8;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00f2fe';
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    ctx.shadowBlur = 0;

    // Inner border
    ctx.strokeStyle = '#4facfe';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Title
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('INJECTIVE NINJA QUEST', canvas.width / 2, 150);

    // Subtitle
    ctx.fillStyle = '#4facfe';
    ctx.font = '32px Arial';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 200);

    // Ninja emoji/icon
    ctx.font = '80px Arial';
    ctx.fillText('🥷', canvas.width / 2, 300);

    // Player info
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`Ninja: ${data.ninjaName}`, canvas.width / 2, 400);

    // Score
    const percentage = Math.round((data.score / data.totalScore) * 100);
    ctx.fillStyle = percentage === 100 ? '#4ade80' : '#4facfe';
    ctx.font = 'bold 48px Arial';
    ctx.fillText(`Score: ${data.score}/${data.totalScore} (${percentage}%)`, canvas.width / 2, 480);

    // Chapters
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px Arial';
    ctx.fillText(`Chapters Completed: ${data.chaptersCompleted}/5`, canvas.width / 2, 540);

    // Achievement message
    ctx.fillStyle = '#4facfe';
    ctx.font = 'italic 28px Arial';
    ctx.fillText('You have mastered the fundamentals of', canvas.width / 2, 620);
    ctx.fillText('Injective\'s Layer 1 blockchain!', canvas.width / 2, 660);

    // Footer
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('🥷 Ninja Labs Community', canvas.width / 2, 740);

    // Convert to blob and download
    canvas.toBlob((blob) => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `injective-ninja-certificate-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }, 'image/png');
}
