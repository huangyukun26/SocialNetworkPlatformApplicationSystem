import axios from 'axios';

const DEMO_USER = {
  _id: 'demo-user',
  username: 'charli_demo',
  email: 'charliH26@hotmail.com',
  bio: 'Computer graphics and 3D vision enthusiast. This is a portfolio demo account.',
  role: 'user',
  avatar: null,
  isPrivate: false,
  privacy: {
    profileVisibility: 'public',
    showFollowers: true,
    showFollowing: true
  },
  statistics: {
    postsCount: 5,
    commentsCount: 12,
    friendsCount: 4,
    followersCount: 18,
    followingCount: 9,
    likesCount: 47
  }
};

const USERS = [
  DEMO_USER,
  {
    _id: 'u-alex',
    username: 'alex.chen',
    bio: 'Rendering, photography, and coffee.',
    avatar: null,
    isPrivate: false,
    privacy: { profileVisibility: 'public', showFollowers: true, showFollowing: true },
    statistics: { postsCount: 8, commentsCount: 21, friendsCount: 16, followersCount: 32, followingCount: 14, likesCount: 95 }
  },
  {
    _id: 'u-maya',
    username: 'maya.lin',
    bio: 'Building small things on the web.',
    avatar: null,
    isPrivate: false,
    privacy: { profileVisibility: 'public', showFollowers: true, showFollowing: true },
    statistics: { postsCount: 11, commentsCount: 18, friendsCount: 12, followersCount: 26, followingCount: 19, likesCount: 73 }
  },
  {
    _id: 'u-liam',
    username: 'liam.w',
    bio: '3D vision · robotics · hiking',
    avatar: null,
    isPrivate: false,
    privacy: { profileVisibility: 'public', showFollowers: true, showFollowing: true },
    statistics: { postsCount: 6, commentsCount: 9, friendsCount: 10, followersCount: 21, followingCount: 13, likesCount: 54 }
  },
  {
    _id: 'u-rina',
    username: 'rina.zhou',
    bio: 'Design systems and interaction prototypes.',
    avatar: null,
    isPrivate: false,
    privacy: { profileVisibility: 'public', showFollowers: true, showFollowing: true },
    statistics: { postsCount: 9, commentsCount: 15, friendsCount: 14, followersCount: 29, followingCount: 17, likesCount: 81 }
  },
  {
    _id: 'u-noah',
    username: 'noah.kim',
    bio: 'Learning distributed systems one bug at a time.',
    avatar: null,
    isPrivate: false,
    privacy: { profileVisibility: 'public', showFollowers: true, showFollowing: true },
    statistics: { postsCount: 4, commentsCount: 7, friendsCount: 8, followersCount: 16, followingCount: 11, likesCount: 34 }
  }
];

let friends = [USERS[1], USERS[2], USERS[3], USERS[4]];
let friendRequests = [
  {
    _id: 'req-1',
    sender: { ...USERS[4] },
    status: 'pending',
    isRead: false,
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  }
];

let notifications = [
  {
    _id: 'notice-1',
    type: 'like',
    sender: USERS[1],
    isRead: false,
    content: '',
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString()
  },
  {
    _id: 'notice-2',
    type: 'comment',
    sender: USERS[2],
    isRead: true,
    content: 'Nice project!',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  }
];

let posts = [
  {
    _id: 'post-1',
    author: USERS[1],
    content: 'Spent the afternoon tuning a small rendering experiment. The visual difference from tiny parameter changes is surprisingly large.',
    images: ['https://picsum.photos/seed/rendering-demo/900/900'],
    likes: ['demo-user', 'u-maya', 'u-rina'],
    comments: [
      {
        _id: 'comment-1',
        user: USERS[2],
        content: 'The lighting looks great.',
        createdAt: new Date(Date.now() - 70 * 60 * 1000).toISOString()
      }
    ],
    savedBy: ['demo-user'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'post-2',
    author: DEMO_USER,
    content: 'A small full-stack social network project: feed, friends, profiles, search, notifications, messaging, recommendation and graph-based analysis.',
    images: [],
    likes: ['u-alex', 'u-liam', 'u-rina', 'u-noah'],
    comments: [
      {
        _id: 'comment-2',
        user: USERS[3],
        content: 'The graph-analysis module is a nice touch.',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      }
    ],
    savedBy: [],
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'post-3',
    author: USERS[3],
    content: 'Trying an online reconstruction pipeline today. Keeping latency low while preserving geometry is harder than it looks.',
    images: ['https://picsum.photos/seed/reconstruction-demo/900/900'],
    likes: ['demo-user', 'u-alex'],
    comments: [],
    savedBy: [],
    createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'post-4',
    author: USERS[2],
    content: 'Mock data, real components. A static portfolio demo can still preserve the original front-end architecture and interaction design.',
    images: [],
    likes: ['demo-user', 'u-rina', 'u-noah'],
    comments: [],
    savedBy: [],
    createdAt: new Date(Date.now() - 31 * 60 * 60 * 1000).toISOString()
  }
];

let messages = [
  {
    _id: 'chat-1',
    sender: USERS[1],
    receiver: DEMO_USER,
    lastMessage: 'I pushed the latest UI changes.',
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString()
  },
  {
    _id: 'chat-2',
    sender: DEMO_USER,
    receiver: USERS[2],
    lastMessage: 'Thanks! I will check it tonight.',
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  }
];

const messageHistory = {
  'u-alex': [
    {
      _id: 'm-1',
      sender: USERS[1],
      receiver: DEMO_USER,
      content: 'I pushed the latest UI changes.',
      status: 'read',
      createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
    },
    {
      _id: 'm-2',
      sender: DEMO_USER,
      receiver: USERS[1],
      content: 'Nice, the layout feels much cleaner now.',
      status: 'read',
      createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
    }
  ],
  'u-maya': [
    {
      _id: 'm-3',
      sender: USERS[2],
      receiver: DEMO_USER,
      content: 'Are you still working on the social analytics view?',
      status: 'read',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: 'm-4',
      sender: DEMO_USER,
      receiver: USERS[2],
      content: 'Yes, I am cleaning up the demo data now.',
      status: 'delivered',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    }
  ]
};

const clone = value => JSON.parse(JSON.stringify(value));
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const buildToken = () => {
  const encode = obj => btoa(JSON.stringify(obj))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ userId: DEMO_USER._id, role: 'user' })}.demo`;
};

const getBody = config => {
  if (!config.data) return {};
  if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
    const body = {};
    for (const [key, value] of config.data.entries()) {
      if (key === 'images') {
        body.images = body.images || [];
        body.images.push(value);
      } else {
        body[key] = value;
      }
    }
    return body;
  }
  if (typeof config.data === 'string') {
    try { return JSON.parse(config.data); } catch (_) { return {}; }
  }
  return config.data || {};
};

const normalizeRequest = config => {
  const raw = config.url || '/';
  let parsed;
  try {
    parsed = new URL(raw, 'http://demo.local');
  } catch (_) {
    parsed = new URL('/', 'http://demo.local');
  }
  return {
    method: (config.method || 'get').toLowerCase(),
    path: parsed.pathname.replace(/\/$/, '') || '/',
    query: parsed.searchParams
  };
};

const response = (config, data, status = 200, headers = {}) => ({
  data: clone(data),
  status,
  statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
  headers: { 'x-demo-mode': 'true', ...headers },
  config,
  request: {}
});

const findUser = idOrName => {
  if (!idOrName || idOrName === 'me') return DEMO_USER;
  return USERS.find(user => user._id === idOrName || user.username === idOrName) || USERS[1];
};

const userForSearch = user => ({
  ...user,
  isFriend: friends.some(friend => friend._id === user._id),
  statistics: user.statistics || { friendsCount: 0 }
});

const addPost = body => {
  const imageFiles = Array.isArray(body.images) ? body.images : [];
  const imageUrls = imageFiles
    .filter(file => typeof File !== 'undefined' && file instanceof File)
    .map(file => URL.createObjectURL(file));
  const newPost = {
    _id: `post-${Date.now()}`,
    author: DEMO_USER,
    content: body.content || 'New demo post',
    images: imageUrls,
    likes: [],
    comments: [],
    savedBy: [],
    createdAt: new Date().toISOString()
  };
  posts = [newPost, ...posts];
  return newPost;
};

const demoAdapter = async config => {
  await wait(70);
  const { method, path, query } = normalizeRequest(config);
  const body = getBody(config);

  if (method === 'post' && (path === '/users/login' || path === '/api/users/login')) {
    return response(config, {
      token: buildToken(),
      sessionId: 'portfolio-demo-session',
      user: DEMO_USER
    });
  }

  if (method === 'get' && /^\/api\/posts\/feed\/page\/\d+$/.test(path)) {
    const page = Number(path.split('/').pop());
    return response(config, { posts: page === 1 ? posts : [], totalPages: 1 }, 200, { 'x-cache-hit': 'true' });
  }

  if (method === 'get' && path === '/api/posts/feed') {
    return response(config, posts);
  }

  if (method === 'post' && path === '/api/posts') {
    return response(config, addPost(body), 201);
  }

  const likeMatch = path.match(/^\/api\/posts\/([^/]+)\/like$/);
  if (method === 'post' && likeMatch) {
    const post = posts.find(item => item._id === likeMatch[1]);
    if (post) {
      post.likes = post.likes.includes(DEMO_USER._id)
        ? post.likes.filter(id => id !== DEMO_USER._id)
        : [...post.likes, DEMO_USER._id];
      return response(config, post);
    }
  }

  const saveMatch = path.match(/^\/api\/posts\/([^/]+)\/save$/);
  if (method === 'post' && saveMatch) {
    const post = posts.find(item => item._id === saveMatch[1]);
    if (post) {
      post.savedBy = post.savedBy.includes(DEMO_USER._id)
        ? post.savedBy.filter(id => id !== DEMO_USER._id)
        : [...post.savedBy, DEMO_USER._id];
      return response(config, post);
    }
  }

  const commentMatch = path.match(/^\/api\/posts\/([^/]+)\/comment$/);
  if (method === 'post' && commentMatch) {
    const post = posts.find(item => item._id === commentMatch[1]);
    const comment = {
      _id: `comment-${Date.now()}`,
      user: DEMO_USER,
      content: body.content || 'Demo comment',
      createdAt: new Date().toISOString()
    };
    if (post) post.comments.push(comment);
    return response(config, comment, 201);
  }

  const deletePostMatch = path.match(/^\/api\/posts\/([^/]+)$/);
  if (method === 'delete' && deletePostMatch) {
    posts = posts.filter(item => item._id !== deletePostMatch[1]);
    return response(config, { success: true });
  }

  if (method === 'get' && path === '/api/posts/search') {
    const q = (query.get('query') || '').toLowerCase();
    const results = posts.filter(post => `${post.content} ${post.author.username}`.toLowerCase().includes(q));
    return response(config, { posts: results });
  }

  if (method === 'get' && path === '/api/search/results') {
    const q = (query.get('q') || '').toLowerCase();
    const relatedUsers = USERS.filter(user => user._id !== DEMO_USER._id && `${user.username} ${user.bio}`.toLowerCase().includes(q));
    const matchingPosts = posts.filter(post => `${post.content} ${post.author.username}`.toLowerCase().includes(q));
    return response(config, {
      exactMatches: matchingPosts.slice(0, 2),
      relatedPosts: posts.filter(post => !matchingPosts.some(item => item._id === post._id)).slice(0, 2),
      authorPosts: matchingPosts.slice(0, 1),
      relatedUsers
    });
  }

  if (method === 'get' && (path === '/api/users/search' || path === '/api/users/search/advanced')) {
    const q = (query.get('query') || '').toLowerCase();
    const results = USERS
      .filter(user => user._id !== DEMO_USER._id)
      .filter(user => `${user.username} ${user.bio}`.toLowerCase().includes(q))
      .map(userForSearch);
    return response(config, results);
  }

  if (method === 'get' && (path === '/api/users/suggestions' || path === '/api/friends/suggestions')) {
    return response(config, USERS.filter(user => user._id !== DEMO_USER._id && !friends.some(friend => friend._id === user._id)).map(userForSearch));
  }

  const userMatch = path.match(/^\/api\/users\/([^/]+)$/);
  if (method === 'get' && userMatch) {
    return response(config, findUser(userMatch[1]));
  }

  if (method === 'get' && path === '/api/friends') {
    return response(config, friends);
  }

  if (method === 'get' && path === '/api/friends/requests') {
    return response(config, friendRequests);
  }

  if (method === 'post' && path === '/api/friends/sync') {
    return response(config, { success: true });
  }

  const friendRequestAction = path.match(/^\/api\/friends\/requests\/([^/]+)\/(accept|reject)$/);
  if (method === 'post' && friendRequestAction) {
    const request = friendRequests.find(item => item._id === friendRequestAction[1]);
    if (request && friendRequestAction[2] === 'accept' && !friends.some(friend => friend._id === request.sender._id)) {
      friends = [...friends, request.sender];
    }
    friendRequests = friendRequests.filter(item => item._id !== friendRequestAction[1]);
    return response(config, { message: friendRequestAction[2] === 'accept' ? '已接受好友请求' : '已拒绝好友请求' });
  }

  const sendFriendRequest = path.match(/^\/api\/friends\/request\/([^/]+)$/);
  if (method === 'post' && sendFriendRequest) {
    return response(config, { message: '好友请求已发送' });
  }

  const friendDelete = path.match(/^\/api\/friends\/([^/]+)$/);
  if (method === 'delete' && friendDelete) {
    friends = friends.filter(friend => friend._id !== friendDelete[1]);
    return response(config, { message: '好友已删除' });
  }

  const friendStatus = path.match(/^\/api\/friends\/status\/([^/]+)$/);
  if (method === 'get' && friendStatus && friendStatus[1] !== 'online') {
    return response(config, { status: friends.some(friend => friend._id === friendStatus[1]) ? 'friends' : 'none' });
  }

  if (method === 'get' && path === '/api/friends/status/online') {
    return response(config, friends.map((friend, index) => ({ userId: friend._id, isOnline: index % 2 === 0 })));
  }

  if (method === 'get' && path === '/api/friends/activity') {
    return response(config, { interactionsCount: 38, activityScore: 82.4 });
  }

  if (method === 'get' && path === '/api/friends/influence-analysis') {
    return response(config, { score: 76, reach: 124, engagement: 0.68, centrality: 0.74, rank: 2 });
  }

  if (method === 'get' && path === '/api/friends/analysis/circles') {
    return response(config, [
      { name: 'Graphics', members: [USERS[1], USERS[3]] },
      { name: 'Campus', members: [USERS[2], USERS[4]] }
    ]);
  }

  const followStatus = path.match(/^\/(?:api\/)?follow\/status\/([^/]+)$/);
  if (method === 'get' && followStatus) {
    return response(config, { isFollowing: ['u-alex', 'u-liam'].includes(followStatus[1]) });
  }

  const followersMatch = path.match(/^\/(?:api\/)?follow\/([^/]+)\/followers$/);
  if (method === 'get' && followersMatch) {
    return response(config, USERS.filter(user => user._id !== followersMatch[1]).slice(0, 3));
  }

  const followingMatch = path.match(/^\/(?:api\/)?follow\/([^/]+)\/following$/);
  if (method === 'get' && followingMatch) {
    return response(config, USERS.filter(user => user._id !== followingMatch[1]).slice(1, 4));
  }

  const userPosts = path.match(/^\/api\/posts\/user\/([^/]+)$/);
  if (method === 'get' && userPosts) {
    return response(config, posts.filter(post => post.author._id === userPosts[1]));
  }

  if (method === 'get' && path === '/api/notifications') {
    return response(config, notifications);
  }

  if (method === 'put' && (path.includes('/notifications/read') || path.includes('/friends/requests'))) {
    notifications = notifications.map(item => ({ ...item, isRead: true }));
    friendRequests = friendRequests.map(item => ({ ...item, isRead: true }));
    return response(config, { success: true });
  }

  if (method === 'get' && path === '/api/messages/unread') {
    return response(config, messages.filter(message => message.unreadCount > 0));
  }

  if (method === 'get' && path === '/api/messages/recent') {
    return response(config, messages);
  }

  const historyMatch = path.match(/^\/api\/messages\/history\/([^/]+)$/);
  if (method === 'get' && historyMatch) {
    return response(config, { success: true, data: messageHistory[historyMatch[1]] || [] });
  }

  if (method === 'post' && path === '/api/messages/send') {
    const receiver = findUser(body.receiverId);
    const item = {
      _id: `m-${Date.now()}`,
      sender: DEMO_USER,
      receiver,
      content: body.content || '',
      status: 'sent',
      createdAt: new Date().toISOString()
    };
    messageHistory[receiver._id] = [...(messageHistory[receiver._id] || []), item];
    return response(config, { success: true, data: item }, 201);
  }

  if (method === 'get' && path === '/api/admin/cache/metrics') {
    return response(config, { metrics: { hitRate: 0.91, avgResponseTime: 18, requests: 1264 } });
  }

  if (method === 'get') return response(config, []);
  return response(config, { success: true, message: 'Demo operation completed' });
};

export const setupPortfolioDemo = () => {
  const token = buildToken();
  const expiry = String(Date.now() + 7 * 24 * 60 * 60 * 1000);

  window.__PORTFOLIO_DEMO__ = true;
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('sessionId', 'portfolio-demo-session');
  sessionStorage.setItem('user', JSON.stringify(DEMO_USER));
  sessionStorage.setItem('tokenExpiry', expiry);
  localStorage.setItem('token', token);

  axios.defaults.adapter = demoAdapter;
  axios.defaults.baseURL = undefined;
};

export { DEMO_USER, USERS };
