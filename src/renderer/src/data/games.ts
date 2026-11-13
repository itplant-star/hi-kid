export interface GameConfig {
  id: string
  name: string
  icon: string
  description: string
  rules: string
}

export const TRY_SAYING_TOPICS = [
  { label: '👋 Self Intro (अपना परिचय)', text: "Hello! My name is Rahul and I want to introduce myself in English." },
  { label: '☕ Daily Routine (दिनचर्या)', text: "Let's talk about my daily routine from morning to evening." },
  { label: '💼 Job Interview Practice', text: "Can you please take a mock job interview for me and ask me questions?" },
  { label: '🛍️ Shopping at Market (दुकानदार से बात)', text: "Let's do a roleplay where you are a shopkeeper and I am a customer buying clothes." },
  { label: '🍽️ Restaurant Ordering (खाना ऑर्डर करना)', text: "Let's roleplay ordering food at a restaurant." },
  { label: '✈️ Asking Directions (रास्ता पूछना)', text: "Excuse me, could you please tell me how to reach the nearest metro station?" },
  { label: '💡 Check My Grammar (मेरी गलतियां बताओ)', text: "I will say sentences in English, please check and correct my grammar mistakes with tips." }
]

export const GAMES: GameConfig[] = [
  {
    id: 'interview-prep',
    name: 'Job Interview Practice',
    icon: '💼',
    description: 'Practice real job interview questions with polite English feedback and sample answers.',
    rules: `Let's do a Job Interview roleplay! You are the HR Manager interviewing me for a job.
Please ask me one common interview question at a time (like 'Tell me about yourself', 'What are your strengths', etc.).
After I reply, gently correct any English mistakes I made, suggest a better sentence, and then ask the next question!`
  },
  {
    id: 'market-roleplay',
    name: 'Shopping & Market Roleplay',
    icon: '🛍️',
    description: 'Practice English conversations for shopping, asking prices, and bargaining.',
    rules: `Let's roleplay a shopping conversation! You are the friendly shopkeeper at a market, and I am the customer.
Start by welcoming me to your shop and asking what I am looking for today. Keep your responses short and friendly!`
  },
  {
    id: 'grammar-fixer',
    name: 'Daily Grammar Fixer',
    icon: '✨',
    description: 'Test your knowledge on common Indian English mistakes like "I am agree" vs "I agree".',
    rules: `Let's play Daily Grammar Fixer! Give me one sentence that has a common Indian English mistake (like 'What is your good name?' or 'I am agree with you').
Ask me to correct it. When I answer, explain the rule in simple English with a Hindi tip, and give me the next one!`
  },
  {
    id: 'vocab-builder',
    name: '5 Daily Spoken Words',
    icon: '📚',
    description: 'Learn 5 practical spoken English words with Hindi meaning, pronunciation, and example.',
    rules: `Teach me 5 useful daily spoken English vocabulary words with their Hindi meaning and a real-life example sentence! Give them to me one by one and ask me to make a sentence.`
  },
  {
    id: 'sentence-builder',
    name: 'Sentence Builder Game',
    icon: '🧱',
    description: 'Take turns adding words to build fluent English sentences.',
    rules: `Let's play Sentence Builder! We take turns adding 2-3 words to build a continuous English story. Keep it fun and natural!`
  }
]
