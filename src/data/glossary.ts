export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'API' | 'n8n' | 'AI' | 'Data' | 'Security';
  definition: string;
  analogy: string;
  example: string;
  quiz?: { question: string; options: string[]; correct: number };
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'api', term: 'API', category: 'API',
    definition: 'Application Programming Interface — a set of rules that allows different software applications to communicate with each other.',
    analogy: 'Like a waiter in a restaurant: you tell the waiter what you want (request), and they bring it from the kitchen (server).',
    example: 'In n8n, the HTTP Request node calls APIs to fetch or send data to external services like Slack or Gmail.',
    quiz: { question: 'What does API stand for?', options: ['Automated Process Integration', 'Application Programming Interface', 'Advanced Programming Input', 'Application Protocol Interface'], correct: 1 },
  },
  {
    id: 'webhook', term: 'Webhook', category: 'API',
    definition: 'A way for an app to send real-time data to another app whenever a specific event occurs.',
    analogy: 'Like a doorbell: instead of constantly checking if someone is at the door, the doorbell notifies you automatically.',
    example: 'A Webhook Trigger node in n8n listens for incoming data and starts a workflow when data arrives.',
    quiz: { question: 'How does a webhook differ from polling?', options: ['It checks periodically', 'It sends data in real-time when events occur', 'It only works with emails', 'It requires manual triggering'], correct: 1 },
  },
  {
    id: 'json', term: 'JSON', category: 'Data',
    definition: 'JavaScript Object Notation — a lightweight data format used to structure and exchange data between systems.',
    analogy: 'Like labeled boxes: each box has a name tag and contains a value. Boxes can contain other boxes too.',
    example: 'n8n uses JSON everywhere. When data flows between nodes, it\'s always in JSON format: {"name": "Marie", "age": 28}',
    quiz: { question: 'What does JSON stand for?', options: ['Java Standard Object Notation', 'JavaScript Object Notation', 'JSON Script Object Network', 'Java Syntax Object Name'], correct: 1 },
  },
  {
    id: 'token', term: 'Token', category: 'Security',
    definition: 'A unique string of characters used for authentication or to measure AI usage (like words processed by ChatGPT).',
    analogy: 'Like a concert ticket: it proves you\'re allowed in, and each one is unique.',
    example: 'OpenAI charges per token used. 1 token ≈ 0.75 words. Your API key is also a type of token.',
    quiz: { question: 'In AI context, what does a token roughly equal?', options: ['A full sentence', 'About 0.75 words', 'One character', 'One paragraph'], correct: 1 },
  },
  {
    id: 'endpoint', term: 'Endpoint', category: 'API',
    definition: 'A specific URL where an API can be accessed. Each endpoint represents a different function or resource.',
    analogy: 'Like departments in a store: shoes are at one counter, electronics at another. Each has its own address.',
    example: 'https://api.openai.com/v1/chat/completions is an endpoint for ChatGPT conversations.',
  },
  {
    id: 'rate_limit', term: 'Rate Limit', category: 'API',
    definition: 'A restriction on how many API requests you can make in a given time period.',
    analogy: 'Like a speed limit on the highway: go too fast and you\'ll get a ticket (error).',
    example: 'OpenAI limits free accounts to 3 requests per minute. n8n can handle this with wait nodes.',
  },
  {
    id: 'oauth', term: 'OAuth 2.0', category: 'Security',
    definition: 'An authorization framework that lets users grant third-party apps access to their data without sharing passwords.',
    analogy: 'Like a valet key: it lets the valet drive your car but not open the trunk.',
    example: 'When n8n asks to connect to your Google account, it uses OAuth to get permission.',
  },
  {
    id: 'rest', term: 'REST', category: 'API',
    definition: 'Representational State Transfer — an architectural style for designing networked applications using HTTP methods.',
    analogy: 'Like a library system: you can GET a book, POST a new one, PUT an update, or DELETE one.',
    example: 'Most APIs n8n connects to are REST APIs. The HTTP Request node supports all REST methods.',
  },
  {
    id: 'payload', term: 'Payload', category: 'Data',
    definition: 'The actual data content being sent in an API request or webhook.',
    analogy: 'Like the contents of a package: the box is the request, the items inside are the payload.',
    example: 'When you send a Slack message via n8n, the message text is the payload.',
  },
  {
    id: 'workflow', term: 'Workflow', category: 'n8n',
    definition: 'A sequence of automated steps (nodes) connected together to perform a task in n8n.',
    analogy: 'Like a recipe: a series of instructions executed in order to produce a result.',
    example: 'A workflow might: Trigger on new email → Extract data → Save to Google Sheets → Send Slack notification.',
  },
  {
    id: 'node', term: 'Node', category: 'n8n',
    definition: 'A single step or action in an n8n workflow. Each node performs a specific task.',
    analogy: 'Like a station on an assembly line: each station does one specific job.',
    example: 'The "Set" node restructures data, the "IF" node makes decisions, the "Gmail" node sends emails.',
  },
  {
    id: 'trigger', term: 'Trigger', category: 'n8n',
    definition: 'The first node in a workflow that starts its execution when a specific event occurs.',
    analogy: 'Like an alarm clock: it starts your day (workflow) at a specific time or event.',
    example: 'A Schedule Trigger runs every hour, a Webhook Trigger runs when data is received.',
  },
  {
    id: 'expression', term: 'Expression', category: 'n8n',
    definition: 'A dynamic value in n8n that references data from previous nodes using {{ }} syntax.',
    analogy: 'Like mail merge: "Dear {{name}}" gets replaced with the actual name.',
    example: '{{ $json.email }} accesses the email field from the previous node\'s output.',
  },
  {
    id: 'variable', term: 'Variable', category: 'n8n',
    definition: 'A named container that stores a value which can be referenced and changed throughout a workflow.',
    analogy: 'Like a sticky note: you write something on it and can read or update it later.',
    example: 'Store an API response in a variable to use it in multiple downstream nodes.',
  },
  {
    id: 'loop', term: 'Loop', category: 'n8n',
    definition: 'A structure that repeats a set of actions for each item in a collection.',
    analogy: 'Like dealing cards: you repeat the same action for each player at the table.',
    example: 'Loop over 100 contacts and send each a personalized email.',
  },
  {
    id: 'condition', term: 'Condition/IF', category: 'n8n',
    definition: 'A logical check that directs the workflow down different paths based on whether a condition is true or false.',
    analogy: 'Like a fork in the road: go left if it\'s raining, go right if it\'s sunny.',
    example: 'IF email contains "urgent" → send Slack alert, ELSE → add to spreadsheet.',
  },
  {
    id: 'error_handling', term: 'Error Handling', category: 'n8n',
    definition: 'The practice of anticipating and managing errors in workflows to prevent failures.',
    analogy: 'Like having a Plan B: if the main road is blocked, take the detour.',
    example: 'Add an Error Trigger node to catch failures and send you a notification.',
  },
  {
    id: 'llm', term: 'LLM', category: 'AI',
    definition: 'Large Language Model — an AI model trained on massive text data to understand and generate human language.',
    analogy: 'Like a very well-read assistant who has read billions of documents and can help with almost any text task.',
    example: 'GPT-4, Claude, and Gemini are LLMs. In n8n, you connect to them via their APIs.',
  },
  {
    id: 'prompt', term: 'Prompt', category: 'AI',
    definition: 'The input text you send to an AI model to get a response. The quality of the prompt determines the quality of the output.',
    analogy: 'Like giving directions: the more specific and clear you are, the better the result.',
    example: '"Summarize this email in 3 bullet points" is a prompt sent to OpenAI via n8n.',
  },
  {
    id: 'embedding', term: 'Embedding', category: 'AI',
    definition: 'A numerical representation of text that captures its meaning, used for similarity search and RAG.',
    analogy: 'Like GPS coordinates for words: similar meanings are close together in the number space.',
    example: 'Convert documents to embeddings, then find the most relevant ones when a user asks a question.',
  },
  {
    id: 'rag', term: 'RAG', category: 'AI',
    definition: 'Retrieval-Augmented Generation — a technique where AI retrieves relevant documents before generating a response.',
    analogy: 'Like an open-book exam: instead of guessing, the AI looks up the answer first.',
    example: 'Build a chatbot that answers questions about your company docs using RAG in n8n.',
  },
  {
    id: 'agent', term: 'Agent', category: 'AI',
    definition: 'An AI system that can autonomously decide which actions to take and use tools to accomplish a goal.',
    analogy: 'Like a personal assistant: you give them a goal and they figure out the steps themselves.',
    example: 'An n8n AI Agent can decide whether to search the web, query a database, or send an email based on the user\'s request.',
  },
  {
    id: 'vector_db', term: 'Vector Database', category: 'AI',
    definition: 'A specialized database that stores and searches embeddings efficiently for similarity-based retrieval.',
    analogy: 'Like a library sorted by topic similarity rather than alphabetically.',
    example: 'Pinecone and Qdrant are vector databases commonly used with n8n for RAG workflows.',
  },
  {
    id: 'self_hosted', term: 'Self-hosted', category: 'n8n',
    definition: 'Running software on your own server instead of using a cloud-hosted version.',
    analogy: 'Like cooking at home vs. eating at a restaurant: more control, but more responsibility.',
    example: 'Self-host n8n on a VPS for unlimited workflows and full data control.',
  },
  {
    id: 'cron', term: 'Cron', category: 'n8n',
    definition: 'A time-based scheduling system that triggers actions at specified intervals.',
    analogy: 'Like a recurring calendar event: it happens automatically at the same time.',
    example: 'A Cron trigger can run your workflow every day at 9 AM.',
  },
  {
    id: 'http_methods', term: 'GET/POST/PUT/DELETE', category: 'API',
    definition: 'The four main HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove).',
    analogy: 'Like library operations: GET = borrow a book, POST = donate a book, PUT = replace a page, DELETE = remove a book.',
    example: 'Use GET to fetch data from an API, POST to create a new record, PUT to update it.',
  },
  {
    id: 'credential', term: 'Credential', category: 'Security',
    definition: 'Stored authentication information (API keys, passwords, tokens) used to connect to external services.',
    analogy: 'Like a keyring: each key opens a different door (service).',
    example: 'In n8n, you create credentials once and reuse them across multiple workflows.',
  },
  {
    id: 'header', term: 'Header', category: 'API',
    definition: 'Metadata sent along with an HTTP request or response, like content type or authentication info.',
    analogy: 'Like the envelope of a letter: it contains info about the sender, recipient, and type of mail.',
    example: 'Set Authorization header to "Bearer YOUR_API_KEY" when calling protected APIs.',
  },
  {
    id: 'body', term: 'Body', category: 'API',
    definition: 'The main content of an HTTP request, typically containing the data you want to send.',
    analogy: 'Like the contents of the envelope: the actual letter inside.',
    example: 'When creating a Slack message, the body contains: {"text": "Hello from n8n!"}',
  },
  {
    id: 'authentication', term: 'Authentication', category: 'Security',
    definition: 'The process of verifying the identity of a user or application trying to access a service.',
    analogy: 'Like showing your ID at a club: proving you are who you say you are.',
    example: 'API Key, OAuth 2.0, and Basic Auth are common authentication methods in n8n.',
  },
];
