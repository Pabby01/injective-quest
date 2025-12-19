import { Zap, Rocket, Code, Globe, Users } from "lucide-react";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  icon: typeof Zap;
  color: string;
  story: string;
  loreIntro: string;
  questions: Question[];
  dataPoint: string;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    slug: "awakening",
    title: "Awakening on Injective",
    subtitle: "The Genesis of Speed",
    icon: Zap,
    color: "cyan",
    story: `You wake up in a digital realm unlike any other. The air hums with electrical energy, and streams of data flow around you like neon rivers. A holographic figure materializes before you—the Ninja Master.

"Welcome, young ninja. You have entered the Injective realm—a Layer 1 blockchain built for speed, security, and true decentralization. Unlike the old chains that struggle under their own weight, Injective was designed from the ground up for the demands of modern DeFi."

The Master gestures to the pulsing network around you. "Here, transactions settle in an instant. No congestion, no delays. This is where the future of finance lives."`,
    loreIntro: "Begin your journey by understanding the foundation of the Injective blockchain.",
    questions: [
      {
        id: "1-1",
        question: "What type of blockchain is Injective?",
        options: [
          "A Layer 2 scaling solution",
          "A Layer 1 blockchain purpose-built for DeFi",
          "A sidechain of Ethereum",
          "A Bitcoin fork"
        ],
        correctAnswer: 1,
        explanation: "Injective is a Layer 1 blockchain specifically designed and optimized for decentralized finance applications, offering native speed and security."
      },
      {
        id: "1-2",
        question: "What consensus mechanism powers Injective?",
        options: [
          "Proof of Work",
          "Delegated Proof of Stake",
          "Tendermint-based Proof of Stake",
          "Proof of Authority"
        ],
        correctAnswer: 2,
        explanation: "Injective uses a Tendermint-based Proof of Stake consensus, enabling instant transaction finality and high throughput."
      }
    ],
    dataPoint: "chainId"
  },
  {
    id: 2,
    slug: "speed",
    title: "Speed of the Chain",
    subtitle: "Lightning Transactions",
    icon: Rocket,
    color: "blue",
    story: `The Ninja Master leads you to a vast arena where transactions zip past like shooting stars. Each one leaves a trail of light before vanishing—confirmed and finalized.

"Watch closely," the Master commands. "In the old world, you would wait minutes, sometimes hours, for a transaction to confirm. Here, finality is instant. Block times under one second. Over 25,000 transactions per second when needed."

A massive counter displays the latest block height, incrementing rapidly. "This speed isn't just about convenience—it's about enabling entirely new types of applications. High-frequency trading, real-time gaming, instant settlements. All possible because of Injective's architecture."`,
    loreIntro: "Experience the blazing speed that sets Injective apart from traditional blockchains.",
    questions: [
      {
        id: "2-1",
        question: "What is Injective's approximate block time?",
        options: [
          "~12 seconds",
          "~1 second",
          "~6 seconds",
          "~30 seconds"
        ],
        correctAnswer: 1,
        explanation: "Injective achieves approximately 1-second block times, enabling near-instant transaction confirmation."
      },
      {
        id: "2-2",
        question: "What does 'instant finality' mean on Injective?",
        options: [
          "Transactions can be reversed within 24 hours",
          "Transactions are confirmed immediately with no chance of reversal",
          "Transactions require multiple confirmations",
          "Transactions are pending for several blocks"
        ],
        correctAnswer: 1,
        explanation: "Instant finality means once a transaction is included in a block, it's immediately and permanently confirmed—no waiting for multiple confirmations."
      }
    ],
    dataPoint: "blockHeight"
  },
  {
    id: 3,
    slug: "arsenal",
    title: "Builder's Arsenal",
    subtitle: "CosmWasm & EVM Power",
    icon: Code,
    color: "purple",
    story: `You enter a magnificent forge where code transforms into reality. Glowing terminals display smart contracts in multiple languages, and holographic blueprints float in the air.

"This is where builders create," the Master explains. "Injective supports CosmWasm for Rust developers and offers full EVM compatibility. Whether you come from the Cosmos ecosystem or Ethereum, your skills transfer directly."

The forge pulses with creative energy. "The iBuild program empowers developers with grants, mentorship, and resources. Every great ninja was once a student—and Injective nurtures its builders like no other chain."`,
    loreIntro: "Discover the powerful development tools available on Injective.",
    questions: [
      {
        id: "3-1",
        question: "Which smart contract frameworks does Injective support?",
        options: [
          "Only Solidity",
          "Only CosmWasm",
          "Both CosmWasm and EVM (Solidity)",
          "Only Move"
        ],
        correctAnswer: 2,
        explanation: "Injective supports both CosmWasm (Rust-based) and EVM (Solidity) smart contracts, welcoming developers from multiple ecosystems."
      },
      {
        id: "3-2",
        question: "What is the iBuild program?",
        options: [
          "A trading competition",
          "A developer program offering grants and support for building on Injective",
          "A staking rewards program",
          "A marketing campaign"
        ],
        correctAnswer: 1,
        explanation: "iBuild is Injective's developer accelerator program, providing grants, mentorship, and resources to teams building on the network."
      }
    ],
    dataPoint: "blockTime"
  },
  {
    id: 4,
    slug: "interoperability",
    title: "Interoperability World",
    subtitle: "Bridging All Chains",
    icon: Globe,
    color: "teal",
    story: `The Master opens a portal, revealing a cosmic web of interconnected chains. Bridges of light connect distant networks, and assets flow freely between them.

"No chain is an island," the Master declares. "Injective connects to Ethereum, Cosmos, Solana, and beyond through secure bridges and IBC. Assets from any chain can find their way here."

You watch as tokens traverse the bridges, each transfer seamless and trustless. "This interoperability isn't just about moving tokens—it's about unifying liquidity and creating a truly connected DeFi ecosystem."`,
    loreIntro: "Learn how Injective connects the multi-chain universe.",
    questions: [
      {
        id: "4-1",
        question: "What is IBC in the context of Injective?",
        options: [
          "International Banking Code",
          "Inter-Blockchain Communication protocol",
          "Injective Base Currency",
          "Internal Block Confirmation"
        ],
        correctAnswer: 1,
        explanation: "IBC (Inter-Blockchain Communication) is a protocol that allows different blockchains to communicate and transfer assets between each other."
      },
      {
        id: "4-2",
        question: "Which ecosystems can Injective connect with?",
        options: [
          "Only Ethereum",
          "Only Cosmos chains",
          "Multiple ecosystems including Ethereum, Cosmos, Solana, and more",
          "Only Bitcoin"
        ],
        correctAnswer: 2,
        explanation: "Injective features bridges to multiple ecosystems, enabling cross-chain asset transfers from Ethereum, Cosmos IBC chains, Solana, and other networks."
      }
    ],
    dataPoint: "network"
  },
  {
    id: 5,
    slug: "ninja-dojo",
    title: "Ninja Labs Dojo",
    subtitle: "Join the Community",
    icon: Users,
    color: "magenta",
    story: `Finally, the Master brings you to the heart of the realm—the Ninja Labs Dojo. Here, warriors from around the world gather, share knowledge, and build the future together.

"You have learned much, young ninja. But knowledge alone does not make a master—community does. The Ninja Labs community is a global collective of builders, traders, and believers."

Holographic avatars of community members surround you, each contributing their unique skills. "Join us. Build with us. The future of DeFi is being written right here, right now. Will you help write it?"`,
    loreIntro: "Complete your training and join the Ninja Labs community.",
    questions: [
      {
        id: "5-1",
        question: "What is the primary focus of the Ninja Labs community?",
        options: [
          "Only token trading",
          "Building and growing the Injective ecosystem together",
          "Mining cryptocurrency",
          "Social media marketing only"
        ],
        correctAnswer: 1,
        explanation: "Ninja Labs is a community-driven collective focused on building, educating, and growing the Injective ecosystem together."
      },
      {
        id: "5-2",
        question: "How can you contribute to the Injective ecosystem?",
        options: [
          "Only by buying tokens",
          "By building apps, creating content, participating in governance, or joining community initiatives",
          "Only through staking",
          "You cannot contribute"
        ],
        correctAnswer: 1,
        explanation: "There are many ways to contribute: building dApps, creating educational content, participating in governance, joining community initiatives, and more."
      }
    ],
    dataPoint: "validator"
  }
];

export const getChapterBySlug = (slug: string): Chapter | undefined => {
  return chapters.find(chapter => chapter.slug === slug);
};

export const getChapterById = (id: number): Chapter | undefined => {
  return chapters.find(chapter => chapter.id === id);
};
