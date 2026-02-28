export interface Module {
  id: string;
  title: string;
  description: string;
  xp: number;
  isMilestone?: boolean;
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  duration: string;
  lessonCount: number;
  modules: Module[];
  badge: { id: string; name: string; icon: string };
}

export const levels: Level[] = [
  {
    id: 1,
    title: 'Foundations',
    subtitle: 'Learn the language of automation',
    icon: 'Sprout',
    color: 'accent',
    duration: '2 weeks',
    lessonCount: 8,
    badge: { id: 'first_steps', name: 'First Steps', icon: 'Sprout' },
    modules: [
      { id: '1.1', title: 'What is Automation?', description: 'Understand why automation matters and what you can achieve', xp: 50 },
      { id: '1.2', title: 'The No-Code Dictionary', description: 'Learn essential terms: API, Webhook, JSON, Token...', xp: 50 },
      { id: '1.3', title: 'Setting Up Your Environment', description: 'Create your accounts and get ready to build', xp: 50 },
      { id: '1.4', title: 'Your First n8n Account', description: 'Navigate the n8n interface like a pro', xp: 50 },
      { id: '1.5', title: 'Understanding the Canvas', description: 'Master the workflow editor and its tools', xp: 50 },
      { id: '1.6', title: 'Your First Workflow', description: 'Build your Hello World automation', xp: 50 },
      { id: '1.7', title: 'Connecting Your First App', description: 'Connect Gmail to n8n and send automated emails', xp: 50 },
      { id: '1.8', title: 'Milestone: Email Logger', description: 'Build a complete email logging system', xp: 150, isMilestone: true },
    ],
  },
  {
    id: 2,
    title: 'Core Skills',
    subtitle: 'Master the essential nodes',
    icon: 'Zap',
    color: 'secondary',
    duration: '3 weeks',
    lessonCount: 12,
    badge: { id: 'node_ninja', name: 'Node Ninja', icon: 'Zap' },
    modules: [
      { id: '2.1', title: 'Triggers Deep Dive', description: 'Schedule, Webhook, and App triggers explained', xp: 50 },
      { id: '2.2', title: 'The HTTP Request Node', description: 'Call any API from your workflows', xp: 50 },
      { id: '2.3', title: 'Working with JSON Data', description: 'Parse, transform, and manipulate JSON', xp: 50 },
      { id: '2.4', title: 'The SET Node', description: 'Structure and reshape your data', xp: 50 },
      { id: '2.5', title: 'IF Conditions & Branching', description: 'Add decision logic to your workflows', xp: 50 },
      { id: '2.6', title: 'Loops and Batching', description: 'Process multiple items efficiently', xp: 50 },
      { id: '2.7', title: 'Error Handling Basics', description: 'Make your workflows resilient', xp: 50 },
      { id: '2.8', title: 'Google Sheets Integration', description: 'Read and write spreadsheet data', xp: 50 },
      { id: '2.9', title: 'Gmail Automation', description: 'Advanced email workflows', xp: 50 },
      { id: '2.10', title: 'Slack Integration', description: 'Build Slack bots and notifications', xp: 50 },
      { id: '2.11', title: 'Notion Integration', description: 'Automate your knowledge base', xp: 50 },
      { id: '2.12', title: 'Milestone: Lead Capture', description: 'Build a full lead capture system', xp: 150, isMilestone: true },
    ],
  },
  {
    id: 3,
    title: 'AI Integration',
    subtitle: 'Add intelligence to your automations',
    icon: 'Bot',
    color: 'primary',
    duration: '3 weeks',
    lessonCount: 10,
    badge: { id: 'ai_whisperer', name: 'AI Whisperer', icon: 'Bot' },
    modules: [
      { id: '3.1', title: 'Introduction to AI APIs', description: 'OpenAI, Claude, Gemini overview', xp: 50 },
      { id: '3.2', title: 'Tokens, Prompts & Costs', description: 'Understand AI pricing and optimization', xp: 50 },
      { id: '3.3', title: 'Text Generation Workflows', description: 'Generate content automatically', xp: 50 },
      { id: '3.4', title: 'Email Summarization', description: 'Classify and summarize emails with AI', xp: 50 },
      { id: '3.5', title: 'Content Generation', description: 'Automate blog posts, social media, and more', xp: 50 },
      { id: '3.6', title: 'Smart Auto-Responder', description: 'Build an AI-powered email responder', xp: 50 },
      { id: '3.7', title: 'Data Extraction with AI', description: 'Extract structured data from unstructured text', xp: 50 },
      { id: '3.8', title: 'Image Analysis Workflows', description: 'Process and analyze images with AI', xp: 50 },
      { id: '3.9', title: 'Your First AI Chatbot', description: 'Build a conversational AI bot', xp: 50 },
      { id: '3.10', title: 'Milestone: AI Email Assistant', description: 'Build a complete AI email assistant', xp: 150, isMilestone: true },
    ],
  },
  {
    id: 4,
    title: 'Advanced Builder',
    subtitle: 'Build production-ready systems',
    icon: 'Building2',
    color: 'secondary',
    duration: '4 weeks',
    lessonCount: 12,
    badge: { id: 'system_architect', name: 'System Architect', icon: 'Building2' },
    modules: [
      { id: '4.1', title: 'Advanced Error Handling', description: 'Monitoring, retries, and fallbacks', xp: 50 },
      { id: '4.2', title: 'Sub-workflows', description: 'Modular design patterns', xp: 50 },
      { id: '4.3', title: 'Variables & Environments', description: 'Manage secrets and configurations', xp: 50 },
      { id: '4.4', title: 'Rate Limiting', description: 'Handle API limits gracefully', xp: 50 },
      { id: '4.5', title: 'Databases', description: 'Airtable, Supabase, PostgreSQL', xp: 50 },
      { id: '4.6', title: 'Webhooks from Scratch', description: 'Build custom webhook endpoints', xp: 50 },
      { id: '4.7', title: 'OAuth Flows', description: 'Advanced authentication patterns', xp: 50 },
      { id: '4.8', title: 'CRM Automation', description: 'HubSpot, Pipedrive workflows', xp: 50 },
      { id: '4.9', title: 'E-commerce Automation', description: 'Shopify, Stripe integrations', xp: 50 },
      { id: '4.10', title: 'RAG Systems', description: 'AI with your own knowledge base', xp: 50 },
      { id: '4.11', title: 'Self-Hosting n8n', description: 'Deploy on your own VPS', xp: 50 },
      { id: '4.12', title: 'Milestone: Business System', description: 'Full business automation system', xp: 150, isMilestone: true },
    ],
  },
  {
    id: 5,
    title: 'Expert & Monetization',
    subtitle: 'Turn skills into income',
    icon: 'Rocket',
    color: 'secondary',
    duration: '4 weeks',
    lessonCount: 10,
    badge: { id: 'automation_master', name: 'Automation Master', icon: 'Rocket' },
    modules: [
      { id: '5.1', title: 'Autonomous AI Agents', description: 'Build agents that think and act', xp: 50 },
      { id: '5.2', title: 'Multi-Agent Workflows', description: 'Orchestrate multiple AI agents', xp: 50 },
      { id: '5.3', title: 'n8n as SaaS Backend', description: 'Build products powered by n8n', xp: 50 },
      { id: '5.4', title: 'White-Labeling', description: 'Customize n8n for clients', xp: 50 },
      { id: '5.5', title: 'Pricing Your Services', description: 'How to charge for automation', xp: 50 },
      { id: '5.6', title: 'Client Onboarding', description: 'Professional client workflows', xp: 50 },
      { id: '5.7', title: 'Template Marketplace', description: 'Sell your workflow templates', xp: 50 },
      { id: '5.8', title: 'Scaling with Enterprise', description: 'n8n Enterprise features', xp: 50 },
      { id: '5.9', title: 'Building Your Agency', description: 'Launch an automation agency', xp: 50 },
      { id: '5.10', title: 'Final: Launch Your Product', description: 'Ship your automation product', xp: 300, isMilestone: true },
    ],
  },
];
