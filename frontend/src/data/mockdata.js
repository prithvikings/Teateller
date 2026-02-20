export const NAV_ITEMS = [
  { icon: "Home", label: "Home Feed", active: true },
  { icon: "Flame", label: "Trending Tea", active: false },
  { icon: "MessageCircle", label: "My Whispers", active: false },
  { icon: "Bell", label: "Notifications", count: 3, active: false },
  { icon: "Bookmark", label: "Saved", active: false },
];

export const TOPICS = [
  { tag: "#OfficeDrama", count: "2.4k" },
  { tag: "#FirstDateFails", count: "1.8k" },
  { tag: "#CollegeLife", count: "950" },
  { tag: "#SecretCrush", count: "3.1k" },
];

export const CONFESSIONS = [
  {
    id: 1,
    author: "Mysterious Tiger #124",
    time: "2m ago",
    tag: "WorkLife",
    content:
      "I secretly water my coworker's fake plant every day just to see if they notice. It's been 6 months and today they told me \"it looks healthier lately\". I almost choked on my coffee.",
    likes: "1.2k",
    dislikes: "3.4k",
    comments: 45,
    avatarColor: "bg-zinc-700",
    dollarCoin: 10,
  },
  {
    id: 2,
    author: "Silent Echo #004",
    time: "15m ago",
    tag: "College",
    content:
      "Found out my ex is dating my professor. Monday lecture is going to be incredibly awkward, especially since I sit in the front row. Should I drop the class?",
    likes: 890,
    dislikes: 120,
    comments: 120,
    reaction: "Haha (56)",
    avatarColor: "bg-zinc-800",
    dollarCoin: 5,
  },
  {
    id: 3,
    author: "Midnight Owl #772",
    time: "1h ago",
    content:
      "Sometimes I feel like everyone else got a manual for how to be an adult and I'm just winging it based on sitcoms I watched in the 90s.",
    tag: "DeepThoughts",
    likes: "3.4k",
    dislikes: 210,
    comments: 210,
    avatarColor: "bg-indigo-900",
    dollarCoin: 12,
  },
  {
    id: 4,
    author: "Crimson Spark #331",
    time: "2h ago",
    content:
      "I interviewed at a competitor company today during my \"doctor's appointment\". They offered me a 30% raise on the spot. I haven't told my current boss yet but I'm smiling too much.",
    tag: "Spiciest",
    likes: "5.1k",
    dislikes: 405,
    comments: 405,
    reaction: "Secure bag (112)",
    avatarColor: "bg-red-900",
    dollarCoin: 23,
  },
];

export const THREAD_DATA = {
  id: "44",
  author: "Silent Owl #44",
  time: "2 hours ago",
  content:
    "I secretly water my boss's fake plants every morning just to see if anyone notices the water overflowing. It's been six months.",

  tags: ["WorkLife", "Confession"],

  stats: {
    likes: 1400,
    dislikes: 120,
    comments: 45,
    dollarCoin: 8,
  },

  isTrending: true,

  comments: [
    {
      id: "c1",
      author: "Anxious Avocado #12",
      time: "1h ago",
      content:
        "This is chaotic good energy at its finest. Does the water evaporate or just spill onto the carpet?",

      votes: 124,

      replies: [
        {
          id: "c1-r1",
          author: "Silent Owl #44",
          isOp: true,
          time: "58m ago",
          content:
            "It has a fake dirt base that is surprisingly absorbent. I'm waiting for the mold to start. It's a science experiment now.",

          votes: 89,
        },
      ],
    },

    {
      id: "c2",
      author: "Corporate Cat #03",
      time: "45m ago",
      content: "As a boss, I'm now looking at my ficus with suspicion. 👀",
      votes: 56,
    },

    {
      id: "c3",
      author: "Jaded Janitor #99",
      time: "15m ago",
      content:
        "Please stop. I'm the one who will eventually have to clean that up.",
      votes: 210,
    },
  ],
};

export const MY_WHISPERS = [
  {
    id: "9a2b3c",
    content: "I secretly water my boss's fake plant just to see if he notices.",
    status: "Public",
    views: 1240,
    reactions: [
      { emoji: "👍", count: 45 },
      { emoji: "❤️", count: 12 },
    ],
    createdAt: "2 days ago",
  },
  {
    id: "8f7e6d",
    content: "Sometimes I unplug the office coffee machine to save energy.",
    status: "Private",
    views: 856,
    reactions: [{ emoji: "😂", count: 89 }],
    createdAt: "5 days ago",
  },
  {
    id: "1x2y3z",
    content: "I told my team I was sick but I just wanted to play video games.",
    status: "Public",
    views: 2105,
    reactions: [{ emoji: "🔥", count: 156 }],
    createdAt: "1 week ago",
  },
  {
    id: "5t6u7v",
    content: "I haven't actually read the terms and conditions.",
    status: "Public",
    views: 432,
    reactions: [{ emoji: "👀", count: 23 }],
    createdAt: "2 weeks ago",
  },
  {
    id: "2p3o4i",
    content: "I eat my roommate's leftovers and blame the cat.",
    status: "Public",
    views: 3450,
    reactions: [
      { emoji: "😡", count: 12 },
      { emoji: "😂", count: 405 },
    ],
    createdAt: "1 month ago",
  },
  {
    id: "2p3o4i",
    content: "I eat my roommate's leftovers and blame the cat.",
    status: "Public",
    views: 3450,
    reactions: [
      { emoji: "😡", count: 12 },
      { emoji: "😂", count: 405 },
    ],
    createdAt: "3 month ago",
  },
  {
    id: "2p3o4i",
    content: "I eat my roommate's leftovers and blame the cat.",
    status: "Public",
    views: 3450,
    reactions: [
      { emoji: "😡", count: 12 },
      { emoji: "😂", count: 405 },
    ],
    createdAt: "4 month ago",
  },
  {
    id: "2p3o4i",
    content: "I eat my roommate's leftovers and blame the cat.",
    status: "Public",
    views: 3450,
    reactions: [
      { emoji: "😡", count: 12 },
      { emoji: "😂", count: 405 },
    ],
    createdAt: "5 month ago",
  },
];

export const NOTIFICATIONS = [
  {
    id: "n1",
    type: "like",
    user: "Anonymous",
    action: "liked your confession",
    target: "regarding office supplies.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    type: "comment",
    user: "New comment",
    action: "on",
    target: '"I never refill the..."',
    time: "1h ago",
    unread: true,
  },
  {
    id: "n3",
    type: "view",
    user: "Your post",
    action: "has reached 1,000 views.",
    target: "",
    time: "5h ago",
    unread: false,
  },
  {
    id: "n4",
    type: "security",
    user: "Your password",
    action: "was changed successfully.",
    target: "",
    time: "1d ago",
    unread: false,
  },
  {
    id: "n5",
    type: "system",
    user: "Weekly Digest",
    action: "is available for review.",
    target: "",
    time: "2d ago",
    unread: false,
  },
];

export const TRENDING_POSTS = [
  {
    id: "t1",
    author: "Work • 2h ago",
    content:
      "I put decaf in the office pot today and watched the chaos unfold. It was purely for scientific observation, obviously.I put decaf in the office pot today and watched the chaos unfold. It was purely for scientific observation, obviously.",
    likes: 45,
    comments: 12,
    icon: "Coffee",
    tag: "PettyRevenge",
  },
  {
    id: "t2",
    author: "Relationships • 5h ago",
    content:
      "My partner thinks I'm a spy because I have two phones. One is strictly for Pokémon Go but I'm too embarrassed to admit it at age 34.",
    likes: 120,
    comments: 34,
    icon: "Smartphone",
    tag: "Secret",
  },
  {
    id: "t3",
    author: "Career • 1d ago",
    content:
      "I've been faking a British accent for 3 years at this job. I'm from Ohio. I don't know how to stop now without getting fired for being a liar.",
    likes: "2.1k",
    comments: 450,
    icon: "Briefcase",
    tag: "FakeIdentity",
  },
  {
    id: "t4",
    author: "Funny • 1d ago",
    content:
      "Stole my roommate's leftovers and blamed the dog. The dog got extra treats as an apology from the roommate, so everyone wins?",
    likes: 300,
    comments: 22,
    icon: "Dog",
    tag: "RoommateWars",
  },
];

export const SAVED_POSTS = [
  {
    id: "s1",
    author: "Midnight Owl #772",
    time: "Saved 2d ago",
    tag: "DeepThoughts",
    content:
      "Sometimes I feel like everyone else got a manual for how to be an adult and I'm just winging it based on sitcoms I watched in the 90s.",
    likes: "3.4k",
    comments: 210,
    avatarColor: "bg-indigo-900",
    note: "Read this when feeling impostor syndrome.",
  },
  {
    id: "s2",
    author: "Crimson Spark #331",
    time: "Saved 1w ago",
    tag: "Spiciest",
    content:
      'I interviewed at a competitor company today during my "doctor\'s appointment". They offered me a 30% raise on the spot.',
    likes: "5.1k",
    comments: 405,
    reaction: "Secure bag (112)",
    avatarColor: "bg-red-900",
  },
  {
    id: "s3",
    author: "Silent Echo #004",
    time: "Saved 1mo ago",
    tag: "College",
    content:
      "Found out my ex is dating my professor. Monday lecture is going to be incredibly awkward.",
    likes: 890,
    comments: 120,
    reaction: "Haha (56)",
    avatarColor: "bg-zinc-800",
  },
];
