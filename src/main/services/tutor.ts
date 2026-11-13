export interface TutorResponse {
  reply: string
  correction?: string
  hindiTip?: string
}

// Indian English common patterns and grammar corrections
const GRAMMAR_RULES: Array<{ pattern: RegExp; correction: string; tip: string }> = [
  {
    pattern: /\bi\s+am\s+agree\b/i,
    correction: "I agree",
    tip: "Tip: 'Agree' ek verb hai, isliye 'I am agree' nahi, balki 'I agree' boleinge."
  },
  {
    pattern: /\bmyself\s+([A-Za-z]+)\b/i,
    correction: "My name is $1 (or I am $1)",
    tip: "Tip: Introduction mein 'Myself...' bolne ki jagah 'My name is...' ya 'I am...' bolna formal aur sahi hai."
  },
  {
    pattern: /\bdid\s+not\s+(knew|went|saw|came|ate|took|gave)\b/i,
    correction: "did not + 1st form of verb",
    tip: "Tip: 'Did not' ke baad hamesha verb ki 1st form aati hai (jaise: 'did not know', 'did not go')."
  },
  {
    pattern: /\b(cousin\s+brother|cousin\s+sister)\b/i,
    correction: "cousin",
    tip: "Tip: English mein 'cousin brother' ya 'cousin sister' nahi bolte, sirf 'cousin' bola jata hai."
  },
  {
    pattern: /\bwhat\s+is\s+your\s+good\s+name\b/i,
    correction: "What is your name? / May I know your name?",
    tip: "Tip: 'Good name' Hindi ke 'shubh naam' ka literal translation hai. English mein 'May I know your name?' bolte hain."
  },
  {
    pattern: /\btoday\s+morning\b/i,
    correction: "this morning",
    tip: "Tip: 'Today morning' ki jagah 'this morning' bola jata hai."
  },
  {
    pattern: /\byesterday\s+night\b/i,
    correction: "last night",
    tip: "Tip: 'Yesterday night' ki jagah 'last night' ka use karein."
  },
  {
    pattern: /\brevert\s+back\b/i,
    correction: "revert / reply",
    tip: "Tip: 'Revert' ka matlab hi wapas aana/reply karna hota hai, iske sath 'back' lagana zaroori nahi."
  },
  {
    pattern: /\bpass\s+out\s+(from|in)\b/i,
    correction: "graduate / graduated",
    tip: "Tip: College/School pass karne ke liye 'graduated' bolte hain. 'Pass out' ka matlab behosh hona bhi hota hai."
  }
]

// Hindi/Hinglish common phrases helper
const HINDI_MAP: Array<{ match: RegExp; english: string; reply: string }> = [
  {
    match: /(kya\s+haal|kaise\s+ho|kaisa\s+hai)/i,
    english: "How are you? / How are you doing?",
    reply: "I am doing great, thank you! How are you doing today? You can say: 'I am doing well, how about you?'"
  },
  {
    match: /(namaste|pranam|ram\s+ram)/i,
    english: "Hello! / Greetings!",
    reply: "Namaste! Hello my friend! Let's practice English together today. How can I help you?"
  },
  {
    match: /(english\s+sikh|seekhna|learn\s+english)/i,
    english: "I want to learn English / I want to improve my spoken English.",
    reply: "Welcome to Supernova English Learning! I am here to help you speak fluent English with confidence. Let's start with a simple question: What is your name and what do you do?"
  },
  {
    match: /(shukriya|dhanyawad|thanks)/i,
    english: "Thank you very much!",
    reply: "You're most welcome! A natural English way to reply is: 'You're welcome!' or 'My pleasure!'"
  }
]

export function checkGrammar(text: string): { correction?: string; tip?: string } | null {
  for (const rule of GRAMMAR_RULES) {
    if (rule.pattern.test(text)) {
      return { correction: rule.correction, tip: rule.tip }
    }
  }
  return null
}

export function getOfflineTutorReply(userText: string): TutorResponse {
  const grammar = checkGrammar(userText)
  const trimmed = userText.trim().toLowerCase()

  // Check Hindi queries
  for (const item of HINDI_MAP) {
    if (item.match.test(trimmed)) {
      return {
        reply: item.reply,
        correction: grammar ? grammar.correction : undefined,
        hindiTip: `English mein boleinge: "${item.english}"`
      }
    }
  }

  // Greetings
  if (/^(hi|hello|hey|good\s+morning|good\s+evening|good\s+afternoon)\b/i.test(trimmed)) {
    return {
      reply: "Hello there! It's wonderful to practice with you today. Tell me, how was your day so far?",
      correction: grammar?.correction,
      hindiTip: grammar?.tip
    }
  }

  // Self Intro / Name
  if (/my\s+name\s+is|i\s+am\s+[a-z]+/i.test(trimmed)) {
    return {
      reply: "Very nice to meet you! Speaking in full sentences is the best way to become fluent. Where are you from in India, and what are your hobbies?",
      correction: grammar?.correction,
      hindiTip: grammar?.tip
    }
  }

  // Practice topics
  if (/job|interview|work/i.test(trimmed)) {
    return {
      reply: "Interview practice is super important! Let's do a quick mock question: 'Can you please tell me about yourself and your background in 2 or 3 sentences?'",
      correction: grammar?.correction,
      hindiTip: grammar?.tip
    }
  }

  if (/hobby|like|love|free\s+time/i.test(trimmed)) {
    return {
      reply: "That sounds fascinating! Engaging in activities you enjoy is great. Why do you enjoy it, and how often do you get time for it?",
      correction: grammar?.correction,
      hindiTip: grammar?.tip
    }
  }

  // General conversational intelligent fallback
  const responses = [
    `That is interesting! Keep expressing your thoughts in English. Could you tell me a little more about that?`,
    `Great practice! You are doing very well. Let me ask you: what is one goal you want to achieve this year?`,
    `I understand! Spoken English becomes easier when we practice daily. How do you usually practice English in your routine?`,
    `Well said! Let's expand on this topic. What would you do next in this situation?`
  ]

  const reply = responses[Math.floor(Math.random() * responses.length)]

  return {
    reply,
    correction: grammar?.correction,
    hindiTip: grammar?.tip
  }
}

export async function getSupernovaResponse(userText: string, onlineBaseUrl?: string): Promise<string> {
  const grammar = checkGrammar(userText)

  // Try online free AI with 3.5s timeout
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3500)

    const url = onlineBaseUrl || 'https://text.pollinations.ai/openai/v1'
    const res = await fetch(`${url}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai',
        messages: [
          {
            role: 'system',
            content: `You are Nova, an encouraging English Spoken Teacher for Indian learners (like Supernova English learning app). 
Rules:
1. Always reply in clear, friendly English (1-3 sentences).
2. If the user made a grammar error, gently point it out with a short tip.
3. If they asked in Hindi/Hinglish, explain how to say it in English.
4. End with an engaging question to keep the conversation flowing.
5. No emojis.`
          },
          { role: 'user', content: userText }
        ],
        max_tokens: 150
      }),
      signal: controller.signal
    })
    clearTimeout(timeout)

    if (res.ok) {
      const data = await res.json()
      const content = data.choices?.[0]?.message?.content
      if (content && content.trim()) {
        let finalResponse = content.trim()
        if (grammar?.tip) {
          finalResponse += `\n\n[Grammar Tip: ${grammar.tip}]`
        }
        return finalResponse
      }
    }
  } catch {
    // Online unavailable or timed out; fallback to offline tutor!
  }

  // Offline Tutor Engine
  const offline = getOfflineTutorReply(userText)
  let result = offline.reply
  if (offline.hindiTip) {
    result += `\n\n[Tip: ${offline.hindiTip}]`
  }
  return result
}
