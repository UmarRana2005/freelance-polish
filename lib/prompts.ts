// lib/prompts.ts  (or app/data/prompts.ts)

export interface PromptCategory {
  id: string;
  title: string;
  description: string;
  prompts: string[];
}

export const promptCategories: PromptCategory[] = [
  {
    id: "follow-up",
    title: "Follow-Up After No Response",
    description: "When the client hasn't replied for days",
    prompts: [
      "Hello! I hope you're doing well. Just checking in on the project status — is there any feedback on the last submission? Looking forward to your thoughts.",
      "Hi there! I wanted to follow up on the deliverables sent on [date]. Please let me know if everything looks good or if any revisions are needed. Thank you!",
      "Hope this message finds you well. I haven't heard back yet regarding the recent work — would you like me to make any adjustments?",
    ],
  },
  {
    id: "payment",
    title: "Asking for Payment Politely",
    description: "Requesting payment or invoice status",
    prompts: [
      "Thank you for the collaboration! As we approach the project milestone, may I kindly request the payment for the completed phase? Invoice attached for reference.",
      "I hope you're satisfied with the recent delivery. Could you please let me know when the payment can be processed? Happy to provide any details needed.",
      "Just a gentle reminder about the pending invoice #[number] dated [date]. Please let me know if there's anything I can assist with on your end.",
    ],
  },
  {
    id: "revision",
    title: "Responding to Revision Requests",
    description: "When client asks for changes",
    prompts: [
      "Thank you for the detailed feedback! I'll incorporate all the suggested changes and send the revised version by [time/date]. Appreciate your input.",
      "Got it — thanks for the clear revisions. I'm on it and will deliver the updated files shortly. Let me know if you'd like to discuss anything further.",
      "Appreciate your review! I'll make the adjustments right away. Expect the new version in your inbox soon.",
    ],
  },
  {
    id: "delay",
    title: "Explaining Delay Professionally",
    description: "When you're running late",
    prompts: [
      "I wanted to update you — due to an unexpected issue, there might be a slight delay. I'm working to resolve it and aim to deliver by [new time]. Thank you for your understanding.",
      "Apologies for the delay in delivery. I've encountered a small technical hurdle but it's nearly resolved. Will share the completed work very soon.",
      "Thank you for your patience. I'm finalizing the last details and will submit everything within the next few hours.",
    ],
  },
  {
    id: "feedback-negative",
    title: "Handling Negative Feedback",
    description: "Client says work is not good",
    prompts: [
      "Thank you for your honest feedback. I truly appreciate it as it helps me improve. Could you please share specific areas you'd like revised? I'll address them immediately.",
      "I value your input and want to ensure you're 100% satisfied. Let's discuss the concerns in more detail so I can make the necessary improvements.",
      "Understood — I'm committed to delivering exactly what you need. Please guide me on the changes, and I'll prioritize them right away.",
    ],
  },
  {
    id: "availability",
    title: "Confirming Availability / Timeline",
    description: "Client asks when you can start or finish",
    prompts: [
      "Yes, I'm available to start immediately! I can deliver the first draft by [date] and complete the full project by [date]. Does this timeline work for you?",
      "Thank you for the opportunity. I can begin work right away and aim to complete it within [X days/weeks]. Let me know if you'd prefer a faster turnaround.",
      "Absolutely — my schedule is open. Happy to start today and keep you updated throughout.",
    ],
  },
  {
    id: "thank-you",
    title: "Thank You After Project Completion",
    description: "Show gratitude and open door for future work",
    prompts: [
      "Thank you so much for trusting me with this project! It was a pleasure working with you. If you need anything else in the future, I'm always here.",
      "I'm grateful for the opportunity to work together. The final delivery is complete — please let me know your thoughts. Looking forward to collaborating again!",
      "Project completed and delivered! Thank you for being an amazing client. Hope we can work together on more exciting projects soon.",
    ],
  },
];
