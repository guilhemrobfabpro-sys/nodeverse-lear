export interface LessonSection {
  type: 'concept' | 'analogy' | 'interactive' | 'code' | 'quiz' | 'challenge' | 'visual';
  title: string;
  content?: string;
  highlight?: string;
  code?: string;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  challenge?: {
    description: string;
    tasks: string[];
    reward: { xp: number; badge?: string };
  };
  items?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  sections: LessonSection[];
}

export const lessons: Record<string, Lesson> = {
  '1.1': {
    id: '1.1',
    title: 'What is Automation?',
    description: 'Understand why automation matters and what you can achieve with no-code tools.',
    sections: [
      {
        type: 'concept',
        title: 'The Repetitive Task Problem',
        content: 'Studies show that **40% of workers spend at least a quarter of their work week on repetitive tasks**. That\'s sending the same emails, copying data between spreadsheets, updating CRM records, posting on social media... The same actions, over and over.\n\nImagine reclaiming that time. What could you build? What problems could you solve?',
        highlight: '40% of work time is spent on repetitive, automatable tasks.',
      },
      {
        type: 'analogy',
        title: 'What Automation Really Means',
        content: 'Think of a factory assembly line. Before automation, every car was hand-built — slow and inconsistent. After automation, machines handle the repetitive parts while humans focus on design and quality.\n\n**Digital automation works the same way.** You define the steps once, and software executes them perfectly, every time, 24/7.',
      },
      {
        type: 'concept',
        title: 'The No-Code Revolution',
        content: 'In the past, automation required writing code — Python scripts, cron jobs, custom APIs. Only developers could automate.\n\n**Now, tools like n8n let anyone build powerful automations visually.** You drag and drop nodes, connect them with lines, and your workflow runs automatically. No code required.',
        items: [
          '**Before**: Write Python scripts → Debug → Deploy → Maintain',
          '**Now**: Drag nodes → Connect → Run → Done',
        ],
      },
      {
        type: 'visual',
        title: 'What You\'ll Be Able to Build',
        content: 'By the end of this course, you\'ll be able to build automations like:',
        items: [
          '📧 Automatically sort and respond to emails with AI',
          '📊 Sync data between 10+ apps in real-time',
          '🤖 Build AI chatbots that answer customer questions',
          '💰 Create lead capture systems that qualify and route leads',
          '🚀 Launch your own automation agency or SaaS product',
        ],
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'What percentage of work time is typically spent on repetitive tasks?',
          options: ['10%', '25%', '40%', '60%'],
          correct: 2,
          explanation: 'Studies show that 40% of workers spend significant time on repetitive, automatable tasks.',
        },
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'What makes n8n different from traditional automation?',
          options: [
            'It requires Python knowledge',
            'It\'s visual and requires no code',
            'It only works with email',
            'It\'s only for developers',
          ],
          correct: 1,
          explanation: 'n8n is a visual automation tool that lets anyone build workflows by dragging and connecting nodes.',
        },
      },
      {
        type: 'challenge',
        title: 'Lesson Challenge',
        challenge: {
          description: 'Think about your daily work or personal life. Identify 3 tasks you do repeatedly that could be automated.',
          tasks: [
            'Name a task you repeat daily',
            'Name a task you repeat weekly',
            'Name a task that involves copying data between apps',
          ],
          reward: { xp: 75 },
        },
      },
    ],
  },
  '1.2': {
    id: '1.2',
    title: 'The No-Code Dictionary',
    description: 'Learn the essential terms you\'ll use throughout your automation journey.',
    sections: [
      {
        type: 'concept',
        title: 'Why Vocabulary Matters',
        content: 'Before building, you need to speak the language. These 5 terms are the foundation of everything in automation. Master them now, and every lesson ahead will be easier.',
      },
      {
        type: 'concept',
        title: 'API — Application Programming Interface',
        content: 'An **API** is how two software applications talk to each other. When you use a weather app, it calls a weather API to get the current temperature.\n\nAPIs use a request/response pattern: you ask for something (request), and the server sends back the answer (response).',
        highlight: 'APIs are the bridges that connect different software together.',
      },
      {
        type: 'analogy',
        title: 'API Analogy',
        content: '🍽️ **Like a restaurant waiter**: You (the client) tell the waiter (API) what you want. The waiter takes your order to the kitchen (server), and brings back your food (response). You never go into the kitchen yourself.',
      },
      {
        type: 'concept',
        title: 'Webhook — Real-Time Notifications',
        content: 'A **Webhook** is a way for an app to automatically notify another app when something happens. Instead of constantly asking "anything new?", the app tells you instantly.',
        highlight: 'Webhooks push data to you in real-time, unlike APIs where you pull data.',
      },
      {
        type: 'analogy',
        title: 'Webhook Analogy',
        content: '🔔 **Like a doorbell**: Instead of checking the door every 5 minutes (polling), the doorbell rings when someone arrives (webhook). Much more efficient!',
      },
      {
        type: 'concept',
        title: 'JSON — The Universal Data Format',
        content: 'JSON (JavaScript Object Notation) is how data is structured when traveling between apps. It uses key-value pairs in a simple, readable format.',
      },
      {
        type: 'code',
        title: 'JSON Example',
        code: '{\n  "name": "Marie",\n  "age": 28,\n  "city": "Paris",\n  "skills": ["automation", "n8n", "AI"]\n}',
        content: 'Each piece of data has a **key** (name) and a **value** (Marie). Values can be text, numbers, or even lists.',
      },
      {
        type: 'concept',
        title: 'Token — Your Digital Key',
        content: 'A **Token** has two meanings in automation:\n\n1. **Authentication Token**: A unique string that proves your identity (like an API key)\n2. **AI Token**: A unit of text processing — roughly 0.75 words\n\nFor OpenAI, 1,000 tokens ≈ 750 words ≈ $0.002 (GPT-3.5).',
        highlight: '1 token ≈ 0.75 words. A typical email uses about 200-500 tokens.',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'What\'s the main difference between an API call and a webhook?',
          options: [
            'APIs are faster than webhooks',
            'APIs pull data, webhooks push data',
            'Webhooks require coding, APIs don\'t',
            'There is no difference',
          ],
          correct: 1,
          explanation: 'APIs require you to actively request data (pull), while webhooks automatically send data when events occur (push).',
        },
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'Which format is used to exchange data between APIs?',
          options: ['HTML', 'CSV', 'JSON', 'PDF'],
          correct: 2,
          explanation: 'JSON is the universal data format for API communication.',
        },
      },
      {
        type: 'challenge',
        title: 'Term Matching Challenge',
        challenge: {
          description: 'Match each concept with its real-world analogy:',
          tasks: [
            'API → Restaurant waiter',
            'Webhook → Doorbell',
            'JSON → Labeled boxes',
            'Token → Concert ticket',
          ],
          reward: { xp: 75, badge: 'vocab_master' },
        },
      },
    ],
  },
  '1.3': {
    id: '1.3',
    title: 'Setting Up Your Environment',
    description: 'Create your accounts and get ready to build your first automation.',
    sections: [
      {
        type: 'concept',
        title: 'What You\'ll Need',
        content: 'Before building your first workflow, you need 3 accounts. All are free to start with:',
        items: [
          '**n8n Cloud** — Your automation platform (free trial)',
          '**OpenAI** — For AI-powered automations ($5 free credit)',
          '**Google Account** — For Gmail, Sheets, Drive integrations',
        ],
      },
      {
        type: 'visual',
        title: 'Step 1: Create n8n Cloud Account',
        content: 'Go to **n8n.io** and sign up for a free cloud account.\n\n1. Click "Get started free"\n2. Enter your email and create a password\n3. Verify your email\n4. You\'ll land on the n8n canvas — your automation workspace!',
        highlight: 'n8n Cloud gives you 5 active workflows for free — more than enough to learn.',
      },
      {
        type: 'visual',
        title: 'Step 2: Create OpenAI Account',
        content: 'Go to **platform.openai.com** and create a developer account.\n\n1. Sign up with email or Google\n2. Navigate to API Keys section\n3. Click "Create new secret key"\n4. **Copy and save this key** — you\'ll need it later!\n\n⚠️ Never share your API key publicly.',
        highlight: 'Your API key is like a password. Keep it secret, keep it safe!',
      },
      {
        type: 'visual',
        title: 'Step 3: Google Account for Automations',
        content: 'If you already have a Google account, you can use it. Otherwise, consider creating a dedicated one for automations.\n\nA dedicated account helps you:\n- Keep automation data separate from personal data\n- Test without affecting your real inbox\n- Share access with team members safely',
      },
      {
        type: 'concept',
        title: 'Security Checklist',
        content: 'Before you start building, follow these security best practices:',
        items: [
          '✅ Use strong, unique passwords for each account',
          '✅ Enable 2-factor authentication (2FA) everywhere',
          '✅ Never hardcode API keys in workflows — use n8n credentials',
          '✅ Store API keys in a password manager',
          '✅ Regularly rotate your API keys',
        ],
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'Where should you store your API keys?',
          options: [
            'In a text file on your desktop',
            'In the workflow itself',
            'In n8n credentials and a password manager',
            'In a Google Sheet',
          ],
          correct: 2,
          explanation: 'Always use n8n\'s built-in credential system and a password manager for API keys. Never hardcode them.',
        },
      },
      {
        type: 'challenge',
        title: 'Setup Checklist',
        challenge: {
          description: 'Complete your setup by creating all required accounts:',
          tasks: [
            'Create n8n Cloud account',
            'Create OpenAI developer account',
            'Generate and save your OpenAI API key',
            'Prepare a Google account for automations',
          ],
          reward: { xp: 100 },
        },
      },
    ],
  },
};
