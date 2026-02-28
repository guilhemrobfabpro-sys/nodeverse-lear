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

  '1.4': {
    id: '1.4',
    title: 'Your First n8n Account',
    description: 'Navigate the n8n interface like a pro and understand the key areas of the platform.',
    sections: [
      {
        type: 'concept',
        title: 'Welcome to n8n',
        content: 'When you first log into n8n Cloud, you\'ll see the **Workflows Dashboard**. This is your home base — every automation you build lives here.\n\nn8n\'s interface has 4 main areas you need to master:',
        items: [
          '**Sidebar** — Navigate between workflows, credentials, and settings',
          '**Workflow list** — All your automations in one place',
          '**Canvas** — Where you visually build your workflows',
          '**Execution log** — History of every time your workflow ran',
        ],
      },
      {
        type: 'visual',
        title: 'The Sidebar Explained',
        content: 'The left sidebar has everything you need:\n\n- **Workflows** — Create and manage automations\n- **Credentials** — Store API keys and connection tokens securely\n- **Executions** — See every time a workflow ran (with full logs)\n- **Templates** — Pre-built workflows to get started fast\n- **Variables** — Global values you can reuse across workflows',
        highlight: 'Credentials are encrypted and isolated — n8n never exposes your API keys in workflow logs.',
      },
      {
        type: 'concept',
        title: 'Creating Your First Credential',
        content: 'Before building workflows, set up your credentials. This is where you store the passwords and API keys that n8n uses to connect to services.\n\nTo add a credential:\n1. Go to **Credentials** in the sidebar\n2. Click **Add Credential**\n3. Search for the service (e.g., "Gmail")\n4. Follow the OAuth flow or paste your API key\n5. Click **Save**',
        highlight: 'You only set up a credential once — then use it in any workflow.',
      },
      {
        type: 'analogy',
        title: 'Credentials vs API Keys',
        content: '🔑 **Think of credentials like a keychain**: You add keys (API tokens) to your keychain (n8n Credentials) once. Then whenever a workflow needs to open a door (call an API), it grabs the key from your keychain automatically.\n\nYou never need to copy-paste your API key into each workflow — it\'s stored safely and reused.',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'Where in n8n do you store your API keys and service connections?',
          options: ['In the workflow settings', 'In the Credentials section', 'In the Variables panel', 'In each node directly'],
          correct: 1,
          explanation: 'The Credentials section stores all your API keys and OAuth tokens securely. They\'re encrypted and reusable across all your workflows.',
        },
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'What can you find in the Executions section?',
          options: ['Your billing information', 'A log of every workflow run with full data', 'The node library', 'Your account settings'],
          correct: 1,
          explanation: 'Executions logs every run of every workflow — you can see exactly what data came in, how each node processed it, and whether it succeeded or failed.',
        },
      },
      {
        type: 'challenge',
        title: 'Explore n8n',
        challenge: {
          description: 'Spend 5 minutes exploring your n8n account and complete these tasks:',
          tasks: [
            'Find the Credentials section and note how many credential types exist',
            'Open a blank workflow and find the node library (+ button)',
            'Find the Executions section (even if it\'s empty)',
            'Locate the Templates section and browse available templates',
          ],
          reward: { xp: 75 },
        },
      },
    ],
  },

  '1.5': {
    id: '1.5',
    title: 'Understanding the Canvas',
    description: 'Master the workflow editor — the drag-and-drop workspace where automation comes to life.',
    sections: [
      {
        type: 'concept',
        title: 'The Canvas is Your Workspace',
        content: 'The n8n canvas is an infinite whiteboard where you build automations visually. Every workflow you create opens in the canvas.\n\nKey canvas elements:\n- **Nodes** — The building blocks (trigger, actions, transforms)\n- **Connections** — Lines linking nodes together\n- **Execution path** — Shows data flowing through your workflow\n- **Mini-map** — Navigate large workflows easily',
      },
      {
        type: 'visual',
        title: 'Anatomy of a Node',
        content: 'Every node has the same structure:\n\n1. **Header** — Name and service icon\n2. **Input connector** (left dot) — Where data comes in\n3. **Output connector** (right dot) — Where data goes out\n4. **Status indicator** — Shows success ✅, error ❌, or running ⟳\n5. **Settings panel** — Opens on click for configuration',
        highlight: 'Data flows from left to right in n8n. Trigger → Transform → Output.',
      },
      {
        type: 'concept',
        title: 'Types of Nodes',
        content: 'n8n has 400+ nodes across 3 categories:',
        items: [
          '**Trigger nodes** (green) — Start the workflow. Examples: Webhook, Schedule, Gmail Trigger',
          '**Action nodes** (gray) — Do something. Examples: Send Email, Create Sheet Row, Send Slack Message',
          '**Core nodes** (blue) — Process data. Examples: IF, Switch, Set, Code, Merge',
        ],
      },
      {
        type: 'analogy',
        title: 'The Pipeline Analogy',
        content: '🚰 **A workflow is like a water pipeline**: Water (data) enters at the source (trigger), flows through pipes (connections), gets filtered and transformed at valves (core nodes), and exits at the destination (action nodes).\n\nIf a pipe breaks (node error), the water stops. That\'s why error handling is essential.',
      },
      {
        type: 'concept',
        title: 'Keyboard Shortcuts',
        content: 'Work faster with these canvas shortcuts:',
        items: [
          '**Space + drag** — Pan around the canvas',
          '**Scroll wheel** — Zoom in/out',
          '**Ctrl/Cmd + A** — Select all nodes',
          '**Ctrl/Cmd + C / V** — Copy and paste nodes',
          '**Delete** — Remove selected node',
          '**Tab** — Open node search',
          '**Ctrl/Cmd + Z** — Undo',
        ],
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'In which direction does data flow in an n8n workflow?',
          options: ['Right to left', 'Top to bottom', 'Left to right', 'Bottom to top'],
          correct: 2,
          explanation: 'Data always flows left to right in n8n. The trigger is on the left, and output nodes are on the right.',
        },
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'What color are trigger nodes in n8n?',
          options: ['Blue', 'Gray', 'Red', 'Green'],
          correct: 3,
          explanation: 'Trigger nodes are green in n8n, making them easy to identify as the starting point of every workflow.',
        },
      },
      {
        type: 'challenge',
        title: 'Canvas Explorer',
        challenge: {
          description: 'Open a new workflow and practice these canvas skills:',
          tasks: [
            'Add a Manual Trigger node to the canvas',
            'Add a Set node and connect it to the trigger',
            'Use Ctrl+Z to undo and redo your last action',
            'Use the mini-map to navigate the canvas',
          ],
          reward: { xp: 75 },
        },
      },
    ],
  },

  '1.6': {
    id: '1.6',
    title: 'Your First Workflow',
    description: 'Build your first real automation — a "Hello World" that sends a formatted message.',
    sections: [
      {
        type: 'concept',
        title: 'The Hello World of Automation',
        content: 'Every developer starts with "Hello World." In n8n, your first workflow will:\n\n1. **Trigger** when you click a button\n2. **Set** a message with your name\n3. **Output** the result\n\nSimple, but it teaches the core pattern that every automation follows.',
        highlight: 'Even the most complex automations follow this same pattern: Trigger → Process → Output.',
      },
      {
        type: 'visual',
        title: 'Step 1 — Add the Manual Trigger',
        content: 'The **Manual Trigger** fires when you click "Execute workflow" in n8n. It\'s perfect for testing.\n\n1. Click the **+** button on the canvas\n2. Search for "Manual Trigger"\n3. Click to add it\n4. You\'ll see a green node appear — this is your starting point',
      },
      {
        type: 'visual',
        title: 'Step 2 — Add a Set Node',
        content: 'The **Set node** creates and shapes data. We\'ll use it to create our message.\n\n1. Click the **+** icon after your Manual Trigger\n2. Search for "Set"\n3. Add it and connect it\n4. Click "Add Field" and create:\n   - Field name: `message`\n   - Value: `Hello, World! My first automation works!`',
      },
      {
        type: 'code',
        title: 'What Your Set Node Creates',
        code: '// Output from the Set node:\n{\n  "message": "Hello, World! My first automation works!"\n}',
        content: 'This JSON object is what gets passed to the next node. Every node creates output data that flows to the next step.',
      },
      {
        type: 'visual',
        title: 'Step 3 — Run It!',
        content: 'Click **"Execute workflow"** (the play button at the bottom). Watch the green lines light up — that\'s your data flowing!\n\nClick on the Set node output to see:\n- The green checkmark ✅\n- The output data with your message\n- The execution time\n\n🎉 **Congratulations — you just built your first automation!**',
        highlight: 'Every time you see a green checkmark, a node executed successfully. Red means error, orange means warning.',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'What is the purpose of the Set node?',
          options: [
            'To trigger a workflow',
            'To create and shape data objects',
            'To send emails',
            'To connect to APIs',
          ],
          correct: 1,
          explanation: 'The Set node creates and transforms data. You use it to add, rename, or remove fields from the data flowing through your workflow.',
        },
      },
      {
        type: 'challenge',
        title: 'Personalize Your Workflow',
        challenge: {
          description: 'Extend your Hello World workflow:',
          tasks: [
            'Add your name to the Set node: create a "name" field',
            'Add a "timestamp" field using {{ $now }}',
            'Add a second Set node that creates a "greeting" combining name + message',
            'Run the workflow and verify all 3 fields appear in the output',
          ],
          reward: { xp: 100, badge: 'first_workflow' },
        },
      },
    ],
  },

  '1.7': {
    id: '1.7',
    title: 'Connecting Your First App',
    description: 'Connect Gmail to n8n and send your first automated email — real automation at last!',
    sections: [
      {
        type: 'concept',
        title: 'From Test to Real',
        content: 'So far, your workflow just processed data internally. Now we connect to the real world.\n\n**Gmail** is the best first integration because:\n- Most people already have a Google account\n- OAuth makes authentication easy\n- You\'ll immediately see results in your inbox\n- The pattern works for 100+ other services',
      },
      {
        type: 'visual',
        title: 'Step 1 — Set Up Gmail Credentials',
        content: '1. Go to **Credentials** in the sidebar\n2. Click **Add Credential → Gmail OAuth2**\n3. Click "Sign in with Google"\n4. Choose your Google account\n5. Grant n8n permission to send emails\n6. Name your credential (e.g., "My Gmail")\n7. Click **Save**',
        highlight: 'OAuth means Google handles the security — you never give n8n your password.',
      },
      {
        type: 'visual',
        title: 'Step 2 — Add the Gmail Node',
        content: '1. In your workflow, add a new node after the Set node\n2. Search for "Gmail"\n3. Select **Gmail → Send Email**\n4. Choose your credential from the dropdown\n5. Fill in:\n   - **To**: your email address\n   - **Subject**: `My First Automated Email!`\n   - **Message**: `{{ $json.message }}` (reference your Set node data)',
      },
      {
        type: 'code',
        title: 'Using Expressions for Dynamic Content',
        code: '// In the Gmail "Message" field, use:\nHello!\n\nThis email was sent automatically by n8n.\nMessage: {{ $json.message }}\nSent at: {{ $now.toLocaleString() }}\n\nYour automation is working!',
        content: 'The `{{ }}` syntax evaluates the expression and inserts the result. This makes every email dynamic and personalized.',
      },
      {
        type: 'concept',
        title: 'Testing vs. Production',
        content: 'n8n has two execution modes:\n\n- **Test mode** (Execute workflow button) — Runs once, shows you the data\n- **Active mode** (toggle switch) — Runs automatically based on the trigger\n\nAlways **test first**, then activate. This prevents sending thousands of emails by accident!',
        highlight: 'Never activate a workflow you haven\'t tested first.',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'What syntax does n8n use to insert dynamic data into fields?',
          options: ['${variable}', '{{variable}}', '<variable>', '[variable]'],
          correct: 1,
          explanation: 'n8n uses {{ }} double curly braces to evaluate expressions. Inside, you can reference $json, $node, $now, and JavaScript functions.',
        },
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'What is the safest way to test a workflow before activating it?',
          options: [
            'Activate it immediately',
            'Use the "Execute workflow" test button first',
            'Ask a friend to test it',
            'Skip testing — it will work',
          ],
          correct: 1,
          explanation: 'Always use the Execute Workflow button (test mode) first. Activation triggers real executions based on real events.',
        },
      },
      {
        type: 'challenge',
        title: 'Send Your First Automated Email',
        challenge: {
          description: 'Complete the Gmail integration:',
          tasks: [
            'Set up Gmail OAuth credentials in n8n',
            'Add a Gmail Send Email node to your workflow',
            'Use {{ $json.message }} to include dynamic content',
            'Execute the workflow and verify the email arrives in your inbox',
          ],
          reward: { xp: 150 },
        },
      },
    ],
  },

  '1.8': {
    id: '1.8',
    title: 'Milestone: Email Logger',
    description: 'Build your first complete real-world system: automatically log every incoming email to a Google Sheet.',
    sections: [
      {
        type: 'concept',
        title: 'Your First Production Workflow',
        content: 'You\'ve learned the basics — now build something **real**. An Email Logger automatically tracks every email you receive in a spreadsheet.\n\nThis is used by:\n- Freelancers tracking client emails\n- Sales teams logging prospects\n- Customer support teams monitoring inquiries\n\nBy the end of this lesson, you\'ll have a live, working automation.',
        highlight: 'This is a real tool people pay $50-100/month for as a SaaS product.',
      },
      {
        type: 'visual',
        title: 'Architecture Overview',
        content: 'Your Email Logger will have 4 nodes:\n\n1. **Gmail Trigger** — Fires when a new email arrives\n2. **Set Node** — Extracts and formats the email data\n3. **IF Node** — Filters out spam and newsletters\n4. **Google Sheets** — Appends a new row with email data',
        highlight: 'Simple 4-node workflow. Real impact. This is the power of n8n.',
      },
      {
        type: 'code',
        title: 'Data You\'ll Extract',
        code: '// From each email, you\'ll capture:\n{\n  "sender": "{{ $json.from.value[0].address }}",\n  "subject": "{{ $json.subject }}",\n  "received": "{{ $json.date }}",\n  "snippet": "{{ $json.text.substring(0, 100) }}",\n  "isImportant": "{{ $json.labelIds.includes(\'IMPORTANT\') }}"\n}',
        content: 'The Gmail trigger gives you rich data about each email. You extract only what matters for your log.',
      },
      {
        type: 'concept',
        title: 'Filtering with IF Node',
        content: 'Not every email should be logged. Filter out noise:\n\n- Skip emails from "noreply@" addresses\n- Skip emails with "unsubscribe" in the body\n- Skip emails already labeled as spam\n\nThe IF node routes emails: **True (keep)** → Google Sheets, **False (skip)** → End.',
      },
      {
        type: 'visual',
        title: 'Setting Up Google Sheets',
        content: 'Create a sheet with these columns:\n\n| Sender | Subject | Date | Preview | Important |\n|--------|---------|------|---------|----------|\n\n1. Add a Google Sheets node\n2. Select "Append Row" operation\n3. Map each column to the right expression\n4. Your sheet grows automatically with every email!',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'In the Email Logger, which node decides whether to log an email or skip it?',
          options: ['Set Node', 'Gmail Trigger', 'IF Node', 'Google Sheets Node'],
          correct: 2,
          explanation: 'The IF node evaluates a condition (e.g., is this spam?) and routes data to different paths — log it or skip it.',
        },
      },
      {
        type: 'challenge',
        title: 'Build the Email Logger',
        challenge: {
          description: 'Build your complete Email Logger system:',
          tasks: [
            'Create Gmail Trigger → Set → IF → Google Sheets workflow',
            'Add a filter rule to skip "noreply" senders',
            'Map at least 4 fields (sender, subject, date, preview) to the sheet',
            'Activate the workflow and let it run for 24 hours',
            'Review your sheet — you\'ve built a real product!',
          ],
          reward: { xp: 200, badge: 'first_steps' },
        },
      },
    ],
  },

  '2.1': {
    id: '2.1',
    title: 'Triggers Deep Dive',
    description: 'Master every type of trigger — Schedule, Webhook, and App triggers — and know when to use each.',
    sections: [
      {
        type: 'concept',
        title: 'The 3 Trigger Categories',
        content: 'Every workflow starts with a trigger. Choosing the right one is critical — it determines **when** and **how** your automation runs.\n\nThere are 3 types:',
        items: [
          '**Schedule Triggers** — Run at specific times (every hour, every Monday, etc.)',
          '**Webhook Triggers** — Run when external services send data to a URL you provide',
          '**App Triggers** — Run when something happens in a connected service (new email, new row, etc.)',
        ],
      },
      {
        type: 'concept',
        title: 'Schedule Trigger — Time-Based Automation',
        content: 'Use the Schedule trigger when you need to run a workflow at a specific time, regardless of external events.\n\n**Use cases:**\n- Send a daily summary email at 8am\n- Check for new data every 15 minutes\n- Run weekly reports every Monday at 9am\n- Clear old database records every night at midnight',
        highlight: 'Schedule triggers use cron expressions. "0 8 * * 1-5" means "8am every weekday".',
      },
      {
        type: 'code',
        title: 'Common Cron Expressions',
        code: '// Every day at 8am\n0 8 * * *\n\n// Every Monday at 9am\n0 9 * * 1\n\n// Every 15 minutes\n*/15 * * * *\n\n// First day of every month at noon\n0 12 1 * *\n\n// Every weekday at 6pm\n0 18 * * 1-5',
        content: 'n8n also has a visual cron editor — click "Define using fields" to set it without memorizing syntax.',
      },
      {
        type: 'concept',
        title: 'Webhook Trigger — Event-Based, Instant',
        content: 'Webhooks are the **fastest** trigger. When an external service sends data to your webhook URL, your workflow fires in milliseconds.\n\n**Use cases:**\n- React to new form submissions (Typeform, Tally)\n- Process payments from Stripe\n- Respond to GitHub commits\n- Handle new signups from your app\n\nEvery webhook gets a unique URL from n8n. You paste it into the external service.',
        highlight: 'Webhooks = real-time. Schedule triggers can introduce up to X minutes of delay.',
      },
      {
        type: 'concept',
        title: 'App Triggers — Native Integrations',
        content: 'App triggers use official integrations to watch for events inside specific apps:\n\n- **Gmail Trigger** → fires on new email\n- **Google Sheets Trigger** → fires on new row\n- **Slack Trigger** → fires on new message\n- **Notion Trigger** → fires on page update\n\nThey\'re easier than webhooks (no URL setup) but limited to supported apps.',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'A client fills a form and you want to send them a welcome email within 5 seconds. Which trigger should you use?',
          options: ['Schedule Trigger (every 5 minutes)', 'Webhook Trigger', 'Manual Trigger', 'Gmail Trigger'],
          correct: 1,
          explanation: 'Webhooks fire instantly when the form is submitted. A Schedule Trigger could introduce up to 5 minutes of delay — far too slow for user experience.',
        },
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'You want to generate and send a weekly performance report every Monday at 9am. Which trigger is best?',
          options: ['Webhook Trigger', 'Gmail Trigger', 'Schedule Trigger', 'Manual Trigger'],
          correct: 2,
          explanation: 'The Schedule Trigger is perfect for time-based automations. Set it to "0 9 * * 1" (9am every Monday) and it runs automatically.',
        },
      },
      {
        type: 'challenge',
        title: 'Trigger Selection Challenge',
        challenge: {
          description: 'For each scenario, identify the best trigger type:',
          tasks: [
            'New Stripe payment → process order: Webhook Trigger',
            'Daily sales report sent at 7am: Schedule Trigger',
            'Someone emails your support address: Gmail Trigger (App Trigger)',
            'New row added to Google Sheets by a team member: Google Sheets Trigger',
          ],
          reward: { xp: 100 },
        },
      },
    ],
  },

  '2.2': {
    id: '2.2',
    title: 'The HTTP Request Node',
    description: 'Call any API in the world — even if n8n doesn\'t have a native node for it.',
    sections: [
      {
        type: 'concept',
        title: 'Your Universal API Tool',
        content: 'n8n has 400+ integrations, but there are thousands more APIs out there. The **HTTP Request node** lets you call **any** API — if it has an endpoint, you can connect to it.\n\nThis is one of the most powerful nodes in n8n. Master it and you\'re never limited by what\'s "officially supported."',
        highlight: 'The HTTP Request node is your escape hatch to the entire internet.',
      },
      {
        type: 'concept',
        title: 'HTTP Methods Explained',
        content: 'APIs communicate via HTTP methods. You need to know these 4:',
        items: [
          '**GET** — Retrieve data (read). Example: "Get me all users"',
          '**POST** — Send new data (create). Example: "Create a new user"',
          '**PUT/PATCH** — Update existing data. Example: "Update user name"',
          '**DELETE** — Remove data. Example: "Delete user account"',
        ],
      },
      {
        type: 'analogy',
        title: 'HTTP Methods Analogy',
        content: '📚 **Like a library system**:\n- **GET** → "Can I borrow this book?" (read)\n- **POST** → "I\'d like to donate this new book" (create)\n- **PUT** → "Replace this damaged book" (full update)\n- **PATCH** → "Fix the typo on page 5" (partial update)\n- **DELETE** → "Please remove this book from the collection" (delete)',
      },
      {
        type: 'concept',
        title: 'Authentication Types',
        content: 'Most APIs require authentication. The HTTP Request node supports all common methods:',
        items: [
          '**API Key** — Passed as a header or query parameter',
          '**Bearer Token** — `Authorization: Bearer YOUR_TOKEN`',
          '**Basic Auth** — Username + password encoded in base64',
          '**OAuth 2.0** — Use n8n credentials for automatic token refresh',
        ],
      },
      {
        type: 'code',
        title: 'Calling the OpenAI API',
        code: '// HTTP Request node configuration:\nMethod: POST\nURL: https://api.openai.com/v1/chat/completions\n\nHeaders:\n  Authorization: Bearer {{ $credentials.openaiApiKey }}\n  Content-Type: application/json\n\nBody (JSON):\n{\n  "model": "gpt-4o-mini",\n  "messages": [\n    {"role": "user", "content": "{{ $json.userMessage }}"}\n  ],\n  "max_tokens": 500\n}',
        content: 'This is how you call OpenAI directly. The response will contain `choices[0].message.content` with the AI\'s reply.',
      },
      {
        type: 'concept',
        title: 'Handling the Response',
        content: 'After the HTTP Request node runs, the response data is available in `$json`.\n\nFor a typical API response like:\n```json\n{ "data": { "id": 123, "name": "Marie" } }\n```\n\nYou access the name with: `{{ $json.data.name }}`\n\nAlways **check the API documentation** to understand the response structure.',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'You want to create a new contact in a CRM via API. Which HTTP method should you use?',
          options: ['GET', 'DELETE', 'POST', 'PATCH'],
          correct: 2,
          explanation: 'POST is used to create new resources. GET retrieves data, DELETE removes it, and PATCH updates existing data.',
        },
      },
      {
        type: 'challenge',
        title: 'Make Your First API Call',
        challenge: {
          description: 'Use the HTTP Request node to call a public API:',
          tasks: [
            'Add an HTTP Request node to a new workflow',
            'Set method to GET and URL to "https://api.coindesk.com/v1/bpi/currentprice.json"',
            'Execute and find the Bitcoin price in the response',
            'Add a Set node to extract just the USD price',
            'Bonus: Add Gmail to email yourself the price daily',
          ],
          reward: { xp: 150 },
        },
      },
    ],
  },

  '2.3': {
    id: '2.3',
    title: 'Working with JSON Data',
    description: 'Master JSON parsing, transformation, and manipulation — the core skill of every automation builder.',
    sections: [
      {
        type: 'concept',
        title: 'JSON is Everywhere',
        content: 'Every API response, webhook payload, and database record uses JSON. If you can\'t read and transform JSON, you can\'t build automations.\n\nThe good news: JSON has only **4 data types** you need to know:',
        items: [
          '**String** — Text in quotes: `"Hello"`',
          '**Number** — Numeric values: `42`, `3.14`',
          '**Boolean** — True or false: `true`, `false`',
          '**Array** — Ordered list: `["apple", "banana", "cherry"]`',
          '**Object** — Key-value pairs: `{ "name": "Marie", "age": 28 }`',
          '**null** — Empty/missing value',
        ],
      },
      {
        type: 'code',
        title: 'Real-World JSON Example',
        code: '// A real Stripe payment webhook payload:\n{\n  "type": "payment_intent.succeeded",\n  "data": {\n    "object": {\n      "id": "pi_3N5kJG2eZvKYlo2C1234",\n      "amount": 9900,\n      "currency": "usd",\n      "customer": "cus_ABC123",\n      "metadata": {\n        "order_id": "ORD-456",\n        "product": "Pro Plan"\n      },\n      "payment_method_types": ["card", "sepa_debit"]\n    }\n  }\n}',
        content: 'This is real data from Stripe. Can you find the amount paid? (Hint: it\'s in cents, so 9900 = $99)',
      },
      {
        type: 'concept',
        title: 'Accessing Nested Data',
        content: 'To access data in n8n expressions:',
        items: [
          '**Root field**: `{{ $json.type }}`  → "payment_intent.succeeded"',
          '**Nested field**: `{{ $json.data.object.amount }}`  → 9900',
          '**Deep nesting**: `{{ $json.data.object.metadata.product }}`  → "Pro Plan"',
          '**Array item**: `{{ $json.data.object.payment_method_types[0] }}`  → "card"',
          '**Array length**: `{{ $json.data.object.payment_method_types.length }}`  → 2',
        ],
      },
      {
        type: 'concept',
        title: 'Transforming Data with Expressions',
        content: 'n8n expressions are JavaScript — you can use any JS string/number/array method:\n\n- `{{ $json.name.toUpperCase() }}` → "MARIE"\n- `{{ $json.amount / 100 }}` → 99 (convert cents to dollars)\n- `{{ $json.email.split("@")[1] }}` → extract domain from email\n- `{{ $json.tags.join(", ") }}` → join array to string\n- `{{ new Date($json.createdAt).toLocaleDateString() }}` → format date',
        highlight: 'You have the full power of JavaScript inside {{ }} expressions.',
      },
      {
        type: 'code',
        title: 'Practical Transformations',
        code: '// Convert cents to dollars with $ sign:\n${{ ($json.amount / 100).toFixed(2) }}\n// → "$99.00"\n\n// Extract domain from email:\n{{ $json.email.split("@")[1] }}\n// → "company.com"\n\n// Format a date:\n{{ new Date($json.created_at).toLocaleDateString("fr-FR") }}\n// → "15/06/2024"\n\n// Truncate long text:\n{{ $json.description.substring(0, 100) }}...\n// → First 100 chars...',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'Given `{ "user": { "emails": ["work@co.com", "personal@gmail.com"] } }`, how do you get "personal@gmail.com"?',
          options: [
            '{{ $json.emails[1] }}',
            '{{ $json.user.emails[2] }}',
            '{{ $json.user.emails[1] }}',
            '{{ $json.user.email[1] }}',
          ],
          correct: 2,
          explanation: 'You need to navigate: $json.user (the user object) → .emails (the array) → [1] (second item, index starts at 0).',
        },
      },
      {
        type: 'challenge',
        title: 'JSON Master Challenge',
        challenge: {
          description: 'Given the Stripe JSON above, write expressions to:',
          tasks: [
            'Extract the amount in dollars (divide by 100, format with 2 decimals)',
            'Extract the order_id from metadata',
            'Extract the first payment method type',
            'Check if "sepa_debit" is in the payment_method_types array',
          ],
          reward: { xp: 150, badge: 'json_master' },
        },
      },
    ],
  },

  '2.4': {
    id: '2.4',
    title: 'The SET Node',
    description: 'The most important core node — master it to structure, reshape, and clean your data.',
    sections: [
      {
        type: 'concept',
        title: 'Why the Set Node is Essential',
        content: 'The Set node is the **most commonly used node** in n8n. It does 4 critical things:\n\n1. **Create** new fields with expressions or static values\n2. **Rename** fields to match the format the next node expects\n3. **Remove** fields you don\'t need (clean up data)\n4. **Transform** values using JavaScript expressions\n\nBefore sending data to any service, you almost always run it through a Set node first.',
        highlight: 'Think of the Set node as a data formatter — it makes your data look exactly how the next step needs it.',
      },
      {
        type: 'concept',
        title: 'Two Modes: Keep or Replace',
        content: 'The Set node has two modes:\n\n- **Keep All Fields** — Adds new fields to existing data (default)\n- **Replace** — Only outputs the fields you explicitly define (cleaner)\n\nUse "Replace" when you want to send only specific fields to an API and not pass along everything from the trigger.',
      },
      {
        type: 'code',
        title: 'Set Node in Action',
        code: '// Input (from webhook):\n{\n  "first_name": "Marie",\n  "last_name": "Dupont",\n  "email_address": "marie@company.com",\n  "phone_number": "+33612345678",\n  "raw_amount": "9900"\n}\n\n// Set node configuration (Replace mode):\n// Fields you define:\nname → "{{ $json.first_name }} {{ $json.last_name }}"\nemail → "{{ $json.email_address }}"\namount → "{{ parseInt($json.raw_amount) / 100 }}"\nformatted_amount → "${{ (parseInt($json.raw_amount) / 100).toFixed(2) }}"\n\n// Output:\n{\n  "name": "Marie Dupont",\n  "email": "marie@company.com",\n  "amount": 99,\n  "formatted_amount": "$99.00"\n}',
        content: 'You transformed messy input into clean, ready-to-use data. This is exactly what you\'d send to a CRM or Google Sheets.',
      },
      {
        type: 'concept',
        title: 'Common Set Node Patterns',
        content: 'Real-world patterns you\'ll use constantly:',
        items: [
          '**Merge fields**: `{{ $json.firstName + " " + $json.lastName }}`',
          '**Format currency**: `${{ ($json.amount/100).toFixed(2) }}`',
          '**Add timestamp**: `{{ $now.toISO() }}`',
          '**Conditional value**: `{{ $json.vip ? "Priority" : "Standard" }}`',
          '**Default value**: `{{ $json.phone || "N/A" }}`',
          '**Extract from email**: `{{ $json.email.split("@")[0] }}`',
        ],
      },
      {
        type: 'analogy',
        title: 'The Preparation Table',
        content: '👨‍🍳 **Like a chef\'s prep station**: Raw ingredients (incoming data) come in messy and varied. The prep station (Set node) cuts, trims, measures, and organizes everything. By the time it goes to the stove (next node), it\'s exactly the right size and format.\n\nNo chef would send uncut vegetables straight to the pan!',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'You receive `{ "price": "1999" }` (a string). You need to send it as a number to an API. How do you transform it in a Set node?',
          options: [
            '{{ $json.price }}',
            '{{ parseInt($json.price) }}',
            '{{ $json.price.toNumber() }}',
            '{{ Number.$json.price }}',
          ],
          correct: 1,
          explanation: 'parseInt() converts a string to an integer. You could also use Number($json.price) or parseFloat() for decimals.',
        },
      },
      {
        type: 'challenge',
        title: 'Data Formatter Challenge',
        challenge: {
          description: 'Use the Set node to transform this raw user data:',
          tasks: [
            'Merge first_name and last_name into a single "full_name" field',
            'Convert "created_at" Unix timestamp to a readable date',
            'Create a "welcome_message" field: "Welcome, [name]!"',
            'Use Replace mode to output only the 3 fields above',
          ],
          reward: { xp: 125 },
        },
      },
    ],
  },

  '2.5': {
    id: '2.5',
    title: 'IF Conditions & Branching',
    description: 'Add decision logic to your workflows — route data based on conditions and build smart automations.',
    sections: [
      {
        type: 'concept',
        title: 'The Power of Conditional Logic',
        content: 'Real-world processes have decisions: "If the order is over $100, apply a discount." "If the email is from a VIP, respond immediately." "If the form is incomplete, reject it."\n\nThe **IF node** brings this decision-making to your automations. It evaluates a condition and routes data to **True** or **False** paths.',
        highlight: 'Without IF nodes, your workflow treats all data the same. With IF nodes, you can handle every case differently.',
      },
      {
        type: 'concept',
        title: 'IF Node Operators',
        content: 'The IF node supports many comparison operators:',
        items: [
          '**Equal** — `$json.status === "active"`',
          '**Not Equal** — `$json.type !== "spam"`',
          '**Greater Than** — `$json.amount > 1000`',
          '**Contains** — `$json.email.includes("@company.com")`',
          '**Is Empty** — `$json.phone === ""`',
          '**Regex Match** — `$json.email.match(/^[^@]+@[^@]+\.[^@]+$/)`',
        ],
      },
      {
        type: 'concept',
        title: 'Multiple Conditions with AND / OR',
        content: 'One condition often isn\'t enough. Combine them:\n\n- **AND** — Both must be true: `amount > 100 AND currency === "USD"`\n- **OR** — Either can be true: `status === "vip" OR spend > 10000`\n\nIn the IF node, click "Add Condition" and choose AND/OR between conditions.',
      },
      {
        type: 'concept',
        title: 'Switch Node — Multiple Routes',
        content: 'For more than 2 paths, use the **Switch node** instead of chaining IF nodes.\n\nExample — Route leads by source:\n- Typeform → Route to sales team A\n- Website form → Route to sales team B\n- Referral → Route to VIP team\n- LinkedIn → Route to enterprise team\n\nSwitch handles all 4 with one node. Cleaner and more maintainable.',
        highlight: 'If you have more than 2 routes, Switch node > chained IF nodes.',
      },
      {
        type: 'code',
        title: 'Complex Branching Logic',
        code: '// Scenario: E-commerce order routing\n\n// IF Node conditions:\n// True path (high value): $json.amount > 500 AND $json.customer_type === "business"\n// False path (standard): everything else\n\n// True path → sends to:\n// 1. Dedicated account manager email\n// 2. Priority order Slack channel\n// 3. CRM with "High Value" tag\n\n// False path → sends to:\n// 1. Standard fulfillment system\n// 2. Automated confirmation email',
        content: 'This single IF node creates two completely different workflows depending on the order value and customer type.',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'You need to route data to 5 different paths based on a "country" field. Which node should you use?',
          options: ['5 chained IF nodes', 'Switch Node', 'Merge Node', 'Set Node'],
          correct: 1,
          explanation: 'The Switch node is designed for multiple routing paths. Chaining 5 IF nodes creates a mess that\'s hard to read and maintain.',
        },
      },
      {
        type: 'challenge',
        title: 'Build a Lead Router',
        challenge: {
          description: 'Design a lead routing workflow using IF and Switch:',
          tasks: [
            'Create a webhook trigger that receives lead data (name, email, budget)',
            'Add an IF node: budget > 5000 → "Enterprise", else → "SMB"',
            'For Enterprise: send Slack message to #enterprise-sales channel',
            'For SMB: add to Google Sheets and send automated welcome email',
          ],
          reward: { xp: 175 },
        },
      },
    ],
  },

  '2.6': {
    id: '2.6',
    title: 'Loops and Batching',
    description: 'Process hundreds or thousands of items efficiently without breaking APIs or timing out.',
    sections: [
      {
        type: 'concept',
        title: 'When You Have Multiple Items',
        content: 'Many triggers and API responses return multiple items:\n- Google Sheets returns 500 rows\n- An API returns a list of 100 contacts\n- A folder has 50 files to process\n\nBy default, n8n processes all items **in parallel** — great for speed, but it can:\n- Hit API rate limits\n- Overwhelm a database\n- Use too much memory\n\nLooping and batching solve these problems.',
        highlight: 'n8n processes each item individually by default — one item in = one item out per node.',
      },
      {
        type: 'concept',
        title: 'The Loop Over Items Pattern',
        content: 'Sometimes you need to process items **sequentially** (one after another) instead of in parallel.\n\nUse the **Loop Over Items node** when:\n- APIs have rate limits (e.g., only 10 requests/second)\n- Order of processing matters\n- You need to accumulate results across items\n- Memory is a concern',
      },
      {
        type: 'concept',
        title: 'Batching — Process in Groups',
        content: 'Batching splits a large list into smaller chunks:\n\n- You have 1000 contacts to email\n- Your email service allows 100/hour\n- Batch size: 100, wait 1 hour between batches\n\nThe **Loop Over Items node** has a "Batch Size" setting. Set to 100 and it automatically groups your items.',
        highlight: 'Batch size + Wait node = Rate limit compliance. Never get your API key banned again.',
      },
      {
        type: 'code',
        title: 'Loop with Wait Pattern',
        code: '// Workflow: Send 1000 emails at 100/hour\n\n// Trigger: Manual or Schedule\n// → Google Sheets: Get all 1000 rows\n// → Loop Over Items (batch size: 100)\n//   → Gmail: Send email to each contact\n//   → Wait: 1 hour\n// → Loop ends when all batches processed\n\n// This safely sends 1000 emails over 10 hours\n// without hitting Gmail\'s rate limits',
        content: 'This pattern is used for cold email campaigns, bulk notifications, and mass data updates.',
      },
      {
        type: 'concept',
        title: 'The Merge Node',
        content: 'After branching (IF or Switch), you sometimes need to **combine paths back together**. That\'s the Merge node.\n\nMerge modes:\n- **Append** — Combine items from both paths into one stream\n- **Pass-through** — Wait for both paths and merge when both complete\n- **Combine** — Merge by key (like a SQL JOIN)',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'You\'re calling an API that allows only 5 requests per second. You have 500 items to process. What\'s the best approach?',
          options: [
            'Process all 500 at once and hope for the best',
            'Use Loop Over Items with batch size 5 + Wait 1 second',
            'Only process the first 5 items',
            'Use a Schedule trigger to run 5 items every second',
          ],
          correct: 1,
          explanation: 'Loop Over Items with batch size 5 + a 1-second Wait node respects the rate limit. You process 5 items, wait 1 second, process the next 5, etc.',
        },
      },
      {
        type: 'challenge',
        title: 'Batch Processing Challenge',
        challenge: {
          description: 'Build a bulk email sender with rate limiting:',
          tasks: [
            'Get 100+ rows from a Google Sheet (use a test sheet)',
            'Add a Loop Over Items node with batch size 10',
            'Add a Wait node of 2 seconds after each batch',
            'For each item, log it to a second sheet (as a safe test)',
            'Calculate: how long will 100 items take at 10/batch with 2s wait?',
          ],
          reward: { xp: 175 },
        },
      },
    ],
  },

  '2.7': {
    id: '2.7',
    title: 'Error Handling Basics',
    description: 'Make your workflows resilient — catch failures, retry automatically, and never lose data silently.',
    sections: [
      {
        type: 'concept',
        title: 'Why Workflows Fail',
        content: 'Production workflows fail. Not sometimes — **regularly**. Common causes:\n\n- API is temporarily down (503 error)\n- Rate limit exceeded (429 error)\n- Invalid data format (400 error)\n- Network timeout\n- Third-party service outage\n\nWithout error handling, failed workflows lose data silently. With it, you catch failures and recover.',
        highlight: 'A workflow without error handling is a ticking time bomb. Add it from day one.',
      },
      {
        type: 'concept',
        title: 'The Error Trigger Node',
        content: 'The **Error Trigger** is a special trigger that fires when another workflow fails.\n\nSetup:\n1. Create a new workflow called "Error Handler"\n2. Add an Error Trigger node\n3. Connect a Slack or Email node to alert you\n4. In your main workflow settings, link it to this error handler\n\nNow whenever your workflow fails, you get an instant notification with the full error details.',
      },
      {
        type: 'code',
        title: 'Error Handler Workflow',
        code: '// Error Handler workflow:\n// Error Trigger → Set Node → Slack\n\n// Set node extracts error details:\n{\n  "workflow": "{{ $json.workflow.name }}",\n  "error": "{{ $json.execution.error.message }}",\n  "node": "{{ $json.execution.lastNodeExecuted }}",\n  "time": "{{ $now.toISO() }}",\n  "execution_id": "{{ $json.execution.id }}"\n}\n\n// Slack message:\n// "🚨 Workflow Failed!\n// Workflow: {{ $json.workflow }}\n// Error: {{ $json.error }}\n// Node: {{ $json.node }}\n// Check n8n executions for details."',
        content: 'This sends an instant Slack alert whenever any linked workflow fails, with full context to debug it.',
      },
      {
        type: 'concept',
        title: 'Retry Behavior',
        content: 'For transient failures (API temporarily down), **automatic retries** help:\n\n1. Right-click any node on the canvas\n2. Select "Settings"\n3. Enable "Retry on Fail"\n4. Set: 3 retries, 1000ms wait\n\nFor permanent failures (invalid data), you need different logic — route to an error path with an IF node.',
      },
      {
        type: 'concept',
        title: 'The Continue on Fail Setting',
        content: 'By default, a node failure stops the entire workflow. Sometimes you want to **continue** even if one item fails.\n\nExample: processing 100 emails, one has invalid format → don\'t stop for the other 99!\n\nEnable "Continue on Fail" in node settings. The workflow continues, and you can check `$json.error` to handle failed items separately.',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'An API call fails with a 429 "Too Many Requests" error. What\'s the best recovery strategy?',
          options: [
            'Log the error and stop the workflow',
            'Enable retry with a wait period (exponential backoff)',
            'Delete the node and use a different API',
            'Ignore the error and continue',
          ],
          correct: 1,
          explanation: 'A 429 error is temporary — the API is rate limiting you. Retrying after a wait period (1s, 2s, 4s — exponential backoff) usually resolves it.',
        },
      },
      {
        type: 'challenge',
        title: 'Build an Error Monitoring System',
        challenge: {
          description: 'Implement error handling for your existing workflows:',
          tasks: [
            'Create a new "Error Handler" workflow with Error Trigger',
            'Configure it to send a Slack DM with workflow name and error message',
            'Link your Email Logger workflow to the Error Handler',
            'Intentionally break a node (wrong expression) and verify you receive the alert',
          ],
          reward: { xp: 200 },
        },
      },
    ],
  },

  '3.1': {
    id: '3.1',
    title: 'Introduction to AI APIs',
    description: 'Understand the AI landscape — OpenAI, Claude, Gemini — and how to integrate them into your workflows.',
    sections: [
      {
        type: 'concept',
        title: 'The AI API Landscape',
        content: 'In 2024-2025, AI APIs became the most powerful tool in an automation builder\'s toolkit. Instead of writing complex logic, you can ask an AI to:\n\n- Classify data\n- Extract structured information from text\n- Generate content\n- Analyze sentiment\n- Translate languages\n- Summarize long documents\n\nAll from within your n8n workflows.',
        highlight: 'AI APIs turn 100 lines of custom code into a single API call.',
      },
      {
        type: 'concept',
        title: 'The Big 3 AI Providers',
        content: 'Three providers dominate the market:',
        items: [
          '**OpenAI (GPT-4o, o1)** — Most integrations, largest ecosystem. Best for: general tasks, code, JSON output',
          '**Anthropic (Claude 3.5/3.7)** — Best reasoning, safest output, longer context. Best for: analysis, writing, complex reasoning',
          '**Google (Gemini 1.5/2.0)** — Multimodal (text + images + video), fastest. Best for: document analysis, images',
        ],
      },
      {
        type: 'concept',
        title: 'How to Call AI APIs in n8n',
        content: 'Two approaches:\n\n1. **Native n8n AI nodes** — OpenAI, Anthropic, Google Gemini nodes. Easiest, point-and-click.\n\n2. **HTTP Request node** — Calls the API directly. More control, works with any AI service.\n\nFor learning, start with the native nodes. For production, HTTP Request gives you more flexibility.',
      },
      {
        type: 'code',
        title: 'OpenAI API Call Structure',
        code: '// Using n8n\'s OpenAI node or HTTP Request:\nPOST https://api.openai.com/v1/chat/completions\n\n{\n  "model": "gpt-4o-mini",  // cheapest, fast\n  "messages": [\n    {\n      "role": "system",\n      "content": "You are a helpful assistant that classifies support tickets."\n    },\n    {\n      "role": "user",\n      "content": "Ticket: My account was charged twice. Please help."\n    }\n  ],\n  "response_format": { "type": "json_object" }  // forces JSON output\n}',
        content: 'The `response_format: json_object` forces GPT to return valid JSON — essential for automation where you need predictable output.',
      },
      {
        type: 'concept',
        title: 'Choosing the Right Model',
        content: 'Not all tasks need the most powerful model. Match the model to the task:',
        items: [
          '**gpt-4o-mini** — Simple classification, formatting, translation. Cheapest ($0.15/1M tokens)',
          '**gpt-4o** — Complex reasoning, code generation, analysis. Balanced cost/power',
          '**claude-3-5-sonnet** — Long documents, nuanced writing, reasoning. Best quality',
          '**gemini-1.5-flash** — Fast image + text tasks, very cheap',
          '**o1** — Math, coding, multi-step reasoning. Slowest but most powerful',
        ],
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'You need to classify 10,000 support tickets per day as "billing", "technical", or "other". Which model should you use?',
          options: ['GPT-4o (most powerful)', 'GPT-4o-mini (fast and cheap)', 'o1 (best reasoning)', 'Claude 3 Opus (longest context)'],
          correct: 1,
          explanation: 'Simple classification tasks don\'t need expensive models. GPT-4o-mini is 10x cheaper and fast enough for 10k daily classifications.',
        },
      },
      {
        type: 'challenge',
        title: 'Your First AI Integration',
        challenge: {
          description: 'Build an AI-powered workflow:',
          tasks: [
            'Create a workflow with a webhook trigger that receives any text',
            'Add an OpenAI node to classify the text as: positive / negative / neutral',
            'Add an IF node: if negative → send Slack alert, if positive → log to sheet',
            'Test with 3 different text inputs',
          ],
          reward: { xp: 200 },
        },
      },
    ],
  },

  '3.2': {
    id: '3.2',
    title: 'Tokens, Prompts & Costs',
    description: 'Understand how AI pricing works and learn to write effective prompts that save money and improve results.',
    sections: [
      {
        type: 'concept',
        title: 'What is a Token?',
        content: 'AI models don\'t read word by word — they process **tokens**. A token is roughly:\n\n- 1 token ≈ 0.75 words in English\n- 1 token ≈ 4 characters\n- "Hello world" = 2 tokens\n- "ChatGPT" = 1 token\n- A typical email ≈ 250-400 tokens\n- This entire lesson ≈ 1,500 tokens\n\nYou pay for **input tokens** (your prompt) + **output tokens** (the response).',
        highlight: '1,000 tokens ≈ 750 words ≈ 1.5 pages of text.',
      },
      {
        type: 'concept',
        title: 'AI Pricing in Practice',
        content: 'Let\'s do real math for a common automation — processing 1,000 emails/day:',
        items: [
          '**Each email**: 300 input tokens (email text + prompt) + 100 output tokens (classification)',
          '**Daily**: 400,000 tokens total',
          '**gpt-4o-mini**: $0.15/1M input + $0.60/1M output ≈ $0.11/day ≈ **$3.30/month**',
          '**gpt-4o**: $5/1M input + $15/1M output ≈ $3.75/day ≈ **$112/month**',
          '**Lesson**: Use the cheapest model that does the job!',
        ],
      },
      {
        type: 'concept',
        title: 'Prompt Engineering Basics',
        content: 'A **prompt** is what you send to the AI. The quality of your prompt directly determines the quality of the output.\n\n3 elements of a great prompt:\n\n1. **Role** — Tell the AI who it is: "You are a professional customer support agent"\n2. **Task** — Clear instruction: "Classify the following email into one of these categories: billing, technical, general"\n3. **Format** — Specify output: "Respond ONLY with a JSON object: {category: string, confidence: number}"',
      },
      {
        type: 'code',
        title: 'Bad Prompt vs. Good Prompt',
        code: '// BAD PROMPT (vague, inconsistent output):\n"Classify this email"\n\n// GOOD PROMPT (specific, structured output):\n"You are an email classifier for a SaaS support team.\n\nClassify the email below into exactly one of these categories:\n- billing: payment issues, invoices, pricing\n- technical: bugs, errors, feature not working\n- general: account questions, how-to, feedback\n\nRespond ONLY with valid JSON:\n{\"category\": \"billing\", \"confidence\": 0.95, \"reason\": \"mentions invoice\"}\n\nEmail to classify:\n{{ $json.email_body }}"',
        content: 'The good prompt gives the AI a role, clear categories, examples, AND forces JSON output. You\'ll get consistent, parseable results every time.',
      },
      {
        type: 'concept',
        title: 'Cost Optimization Techniques',
        content: 'Save money without sacrificing quality:',
        items: [
          '**Use the smallest model** that achieves your accuracy target',
          '**Cache repeated prompts** — if the system prompt is the same, cache it',
          '**Truncate long inputs** — only send the relevant part of a document',
          '**Batch requests** — some APIs offer bulk discounts',
          '**Set max_tokens** — cap the response length to avoid runaway costs',
          '**Monitor with n8n** — log token counts to track spending',
        ],
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        quiz: {
          question: 'Your AI prompt is returning inconsistent formats (sometimes JSON, sometimes plain text). What\'s the fix?',
          options: [
            'Switch to a more expensive model',
            'Add explicit format instructions and use response_format: json_object',
            'Try different prompts until it works',
            'Process the output with regex',
          ],
          correct: 1,
          explanation: 'Explicit format instructions ("respond ONLY with JSON") + the response_format parameter guarantees consistent output. Never rely on the model to "guess" the format you want.',
        },
      },
      {
        type: 'challenge',
        title: 'Prompt Engineering Workshop',
        challenge: {
          description: 'Optimize an AI integration:',
          tasks: [
            'Write a prompt to extract: name, company, budget from any email text',
            'Force JSON output with specific field names',
            'Calculate the monthly cost at 500 emails/day using gpt-4o-mini',
            'Compare: what would it cost with gpt-4o? How much do you save?',
          ],
          reward: { xp: 200 },
        },
      },
    ],
  },
};
