const conn = require('./conn');
const User = require('./User');
const Relation = require('./Relation');
const Interest = require('./Interest');
const Group = require('./Group');
const Post = require('./Post/Post');
const Reaction = require('./Post/Reaction');
const Comment = require('./Post/Comment');
const Notification = require('./Notification');
const Conversation = require('./Messenger/Conversation');
const Message = require('./Messenger/Message');

// Associations
User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Relation);
Relation.belongsTo(User);
User.hasMany(Interest);
Interest.belongsTo(User);
User.hasMany(Group);
Group.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
User.hasMany(Reaction);
Reaction.belongsTo(User);
Post.hasMany(Reaction);
Reaction.belongsTo(Post);
Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasMany(Notification);
Notification.belongsTo(User);

//user, conversation and message relations

Message.belongsTo(User, { as: 'sender' });

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

//sync and seed
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [
    emily,
    felix,
    nono,
    beejay,
    grace,
    eric,
    dustin,
    lucas,
    santa,
    rudolph,
    nancy,
    sam,
    abe,
  ] = await Promise.all([
    User.create({
      username: 'emily',
      password: '123',
      firstName: 'Emily',
      lastName: 'Sardarov',
      email: 'esardarov@gmail.com',
      githubUsername: 'emily-sardarov',
      location: 'Chicago City',
      bio: 'This is Emily',
      profilePic:
        'https://avatars.dicebear.com/api/avataaars/your-custom-seed.svg?b=%234f7a28&r=50&top%5B%5D=straight01&hairColor%5B%5D=brown&clothes%5B%5D=hoodie&clothesColor%5B%5D=red&eyes%5B%5D=default&mouth%5B%5D=smile&skin%5B%5D=pale',
    }),
    User.create({
      username: 'felix',
      password: '123',
      firstName: 'Felix',
      lastName: 'Lee',
      email: 'flee@gmail.com',
      githubUsername: 'felix-lee',
      location: 'New York City',
      bio: 'This is Felix',
      profilePic:
        'https://avatars.dicebear.com/api/adventurer-neutral/felix%40devSpace.svg?b=%2372008f',
    }),
    User.create({
      username: 'nono',
      password: '123',
      firstName: 'Nono',
      lastName: 'Hu',
      email: 'nhu@gmail.com',
      githubUsername: 'nono-hu',
      location: 'Boston City',
      bio: 'This is Nono',
      profilePic:
        'https://avatars.dicebear.com/api/bottts/111111111111111111111111111111111111111111.svg',
    }),
    User.create({
      username: 'beejay',
      password: '123',
      firstName: 'Beejay',
      lastName: 'Salting',
      email: 'bsalting@gmail.com',
      githubUsername: 'beejay-salting',
      location: 'Jersey City',
      bio: 'This is Beejay',
      profilePic: 'https://avatars.dicebear.com/api/avataaars/resisty.svg',
    }),
    User.create({
      username: 'g-hopper',
      password: '123',
      firstName: 'Grace',
      lastName: 'Hopper',
      email: 'ghops@gmail.com',
      location: 'NYC',
      bio: 'computer scientist, mathematician, and United States Navy rear admiral',
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
    }),
    User.create({
      username: 'eric',
      password: '123',
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
    }),
    User.create({
      username: 'dusty',
      password: '123',
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
      firstName: 'Dustin',
      lastName: 'Henderson',
      email: 'd.henderson@gmail.com',
      location: 'Hawkins, PA',
      bio: 'computer nerd and D&D fanatic',
    }),
    User.create({
      username: 'lucas',
      password: '123',
      firstName: 'Lucas',
      lastName: 'Sinclair',
      email: 'l.sinclair@gmail.com',
      location: 'Hawkins, PA',
      bio: 'loves D&D and diy basketball',
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
    }),
    User.create({
      username: 'santa',
      password: '123',
      firstName: 'Santa',
      lastName: 'Claus',
      email: 'santa@northpole.com',
      location: 'North Pole',
      bio: "Ho, ho, ho! Can't wait to deliver all your gifts!",
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
    }),
    User.create({
      username: 'rudolphistired',
      password: '123',
      firstName: 'Rudolph',
      lastName: 'Reindeer',
      email: 'rudolph@northpole.com',
      location: 'North Pole',
      bio: 'Learning to code one day at a time so I can make my routes more efficient',
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
    }),
    User.create({
      username: 'nance',
      password: '123',
      firstName: 'Nancy',
      lastName: 'Wheeler',
      email: 'nance.wheeler@gmail.com',
      location: 'Hawkins, PA',
      bio: 'aspiring investigative journalist and web blogger',
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
    }),
    User.create({
      username: 'samiam',
      password: '123',
      firstName: 'Sam',
      lastName: 'Smith',
      email: 'sam@gmail.com',
      location: 'Poughkeepsie',
      bio: 'I love to cook green eggs & ham',
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
    }),
    User.create({
      username: 'honestabe',
      password: '123',
      firstName: 'Abraham',
      lastName: 'Lincoln',
      email: 'abe@gmail.com',
      location: 'Illinois',
      bio: 'Been trying to pick up a new hobby',
      profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`,
    }),
  ]);
  // ProfilePic random
  /* 
  profilePic: `https://avatars.dicebear.com/api/bottts/${
        Math.random() * 1000
      }.svg`
  */

  const [
    postByEmily,
    postByFelix,
    postWithCode,
    postByGrace,
    postByEric,
    postWithImg,
    postBySanta,
    postByRudolph,
    postBySam,
    postByAbe,
    postByNancy,
  ] = await Promise.all([
    Post.create({
      userId: emily.id,
      text: "Hello World! This is Emily's 1st ever post on DevSpace!",
      visibility: 'everyone',
    }),
    Post.create({
      userId: felix.id,
      text: 'Salutations World! Felix here, just saying hey with my 1st post, excited to make new friends and connections :)',
      visibility: 'everyone',
    }),
    Post.create({
      userId: felix.id,
      code: "const setPosts = (posts) => {\n\t\
  return {\n\t\
    type: 'SET_POSTS',\n\t\
    posts,\n\t\
  };\n\
};",
    }),
    Post.create({
      userId: grace.id,
      text: 'So excited to be a part of devSpace!',
    }),
    Post.create({
      userId: eric.id,
      text: 'HELLO EVERYBODY!',
    }),
    Post.create({
      userId: felix.id,
      text: 'express router set-up',
      mediaUrl: 'static/img/Screen Shot 2022-08-02 at 2.16.26 PM.png',
    }),
    Post.create({
      userId: santa.id,
      code: `const myList = (children) => {
  for(let i = 0; i < children.length; i++){
    if(children[i] === 'good'){
      console.log('gift');
      } else {
      console.log('coal');
    }
  }
};`,
    }),

    Post.create({
      userId: rudolph.id,
      text: `Hey everyone, I am stuck on a coding challenge. I have been trying to maximize efficiency in my delivery routes, and I just do not know where to start.
      Does anyone have any algo resources?`,
    }),
    Post.create({
      userId: sam.id,
      code: `class DoublyLinkedList {
        constructor() {
          this.nodes = [];
        }
      
        get size() {
          return this.nodes.length;
        }
      
        get head() {
          return this.size ? this.nodes[0] : null;
        }
      
        get tail() {
          return this.size ? this.nodes[this.size - 1] : null;
        }
      
        insertAt(index, value) {
          const previousNode = this.nodes[index - 1] || null;
          const nextNode = this.nodes[index] || null;
          const node = { value, next: nextNode, previous: previousNode };
      
          if (previousNode) previousNode.next = node;
          if (nextNode) nextNode.previous = node;
          this.nodes.splice(index, 0, node);
        }
      
        insertFirst(value) {
          this.insertAt(0, value);
        }
      
        insertLast(value) {
          this.insertAt(this.size, value);
        }
      
        getAt(index) {
          return this.nodes[index];
        }
      
        removeAt(index) {
          const previousNode = this.nodes[index - 1] || null;
          const nextNode = this.nodes[index + 1] || null;
      
          if (previousNode) previousNode.next = nextNode;
          if (nextNode) nextNode.previous = previousNode;
      
          return this.nodes.splice(index, 1);
        }
      
        clear() {
          this.nodes = [];
        }
      
        reverse() {
          this.nodes = this.nodes.reduce((acc, { value }) => {
            const nextNode = acc[0] || null;
            const node = { value, next: nextNode, previous: null };
            if (nextNode) nextNode.previous = node;
            return [node, ...acc];
          }, []);
        }
      
        *[Symbol.iterator]() {
          yield* this.nodes;
        }
      }`,
    }),
    Post.create({
      userId: abe.id,
      mediaUrl: '/static/img/sql.png',
    }),
    Post.create({
      userId: nancy.id,
      text: 'DOM manipulation exercise',
      mediaUrl: '/static/img/hasCoworker.png',
    }),
    Post.create({
      userId: dustin.id,
      code: `const [showForm, setShowForm] = useState(false);
  const date = new Date(createdAt);
  const date2 = new Date(updatedAt);
  const showEditForm = () => {
    setShowForm(true);
  };`,
    }),

    Post.create({
      userId: lucas.id,
      code: `const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);`,
    }),
    Post.create({
      userId: lucas.id,
      text: 'my template for setting up api routes',
      code: `const express = require('express');
const app = express.Router();
const { Post, User } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User }],
      order: [['createdAt', 'DESC']],
    });
    res.send(posts);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    const postPlusUser = await Post.findByPk(post.id, {
      include: [{ model: User }],
      order: [['createdAt', 'DESC']],
    });
    res.send(postPlusUser);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    await post.update(req.body);
    res.send(post);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    await post.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
`,
    }),
    Post.create({
      userId: nancy.id,
      text: `TDD: syntax for 'describe'`,
      mediaUrl: 'static/img/CI - testem.png',
    }),
  ]);

  const [relBE, relEB, relNB] = await Promise.all([
    Relation.create({
      userSource: beejay.id,
      userTarget: emily.id,
      userId: beejay.id,
    }),
    Relation.create({
      userSource: felix.id,
      userTarget: beejay.id,
      userId: felix.id,
    }),
    Relation.create({
      userSource: beejay.id,
      userTarget: nono.id,
      userId: beejay.id,
    }),
    Relation.create({
      userSource: lucas.id,
      userTarget: beejay.id,
      userId: lucas.id,
    }),
    Relation.create({
      userSource: nancy.id,
      userTarget: beejay.id,
      userId: nancy.id,
    }),
    Relation.create({
      userSource: dustin.id,
      userTarget: beejay.id,
      userId: dustin.id,
    }),
    Relation.create({
      userSource: beejay.id,
      userTarget: felix.id,
      userId: beejay.id,
    }),
    Relation.create({
      userSource: nono.id,
      userTarget: beejay.id,
      userId: nono.id,
    }),
    Relation.create({
      userSource: emily.id,
      userTarget: beejay.id,
      userId: emily.id,
    }),
    Relation.create({
      userSource: eric.id,
      userTarget: beejay.id,
      userId: eric.id,
    }),
    Relation.create({
      userSource: beejay.id,
      userTarget: lucas.id,
      userId: beejay.id,
    }),
    Relation.create({
      userSource: beejay.id,
      userTarget: grace.id,
      userId: beejay.id,
    }),
  ]);
  const [
    comment1,
    comment2,
    comment3,
    comment4,
    comment5,
    comment6,
    comment7,
    comment8,
    comment9,
    comment10,
    comment11,
    comment12,
  ] = await Promise.all([
    Comment.create({
      commentText: 'Hi Emily, welcome to DevSpace!',
      postId: postByEmily.id,
      userId: nono.id,
    }),
    Comment.create({
      commentText: 'Hi Emily, i just joined DevSpace as well, welcome!',
      postId: postByEmily.id,
      userId: felix.id,
    }),
    Comment.create({
      commentText: 'Hi Felix, it is nice to meet you!',
      postId: postByFelix.id,
      userId: emily.id,
    }),
    Comment.create({
      commentText: 'Welcome aboard!',
      postId: postByFelix.id,
      userId: beejay.id,
    }),
    Comment.create({
      commentText:
        'I think you should be returning the gifts and coal instead of using console.log()',
      postId: postBySanta.id,
      userId: rudolph.id,
    }),
    Comment.create({
      commentText: 'hey rudy',
      postId: postByRudolph.id,
      userId: santa.id,
    }),
    Comment.create({
      commentText:
        'ty for sharing! Do you have the base code for a singly linked list as well?',
      postId: postBySam.id,
      userId: felix.id,
    }),
    Comment.create({
      commentText: "Hi there! It's nice to meet you",
      postId: postByGrace.id,
      userId: abe.id,
    }),
    Comment.create({
      commentText:
        "I've used express before, but I never heard of morgan. Can you explain what that is?",
      postId: postWithImg.id,
      userId: sam.id,
    }),
    Comment.create({
      commentText: 'hey, is that you, prof??',
      postId: postByEric.id,
      userId: beejay.id,
    }),
    Comment.create({
      commentText:
        "hey Abe, do you have any more of these kind of cheat sheets? they're very useful",
      postId: postByAbe.id,
      userId: nono.id,
    }),
    Comment.create({
      commentText:
        "What does that last block of code do? Haven't seen that notation before",
      postId: postBySam.id,
      userId: emily.id,
    }),
    Comment.create({
      commentText:
        "I'm also studying linked lists right now, thanks for sharing this 👍🏾",
      postId: postBySam.id,
      userId: nancy.id,
    }),
    Comment.create({
      commentText:
        'Thanks for the comment! Morgan is essentially a piece of middleware that logs HTTP requests. I find it super helpful for debugging purposes.',
      postId: postWithImg.id,
      userId: felix.id,
    }),
  ]);

  const [
    like1,
    like2,
    like3,
    like4,
    like5,
    like6,
    like7,
    like8,
    like9,
    like10,
    like11,
    like12,
    like13,
    like14,
    like15,
    like16,
  ] = await Promise.all([
    Reaction.create({
      name: 'like',
      postId: postByEmily.id,
      userId: nono.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByEmily.id,
      userId: felix.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByFelix.id,
      userId: emily.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByFelix.id,
      userId: beejay.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByAbe.id,
      userId: beejay.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByAbe.id,
      userId: grace.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByAbe.id,
      userId: emily.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByAbe.id,
      userId: eric.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postBySam.id,
      userId: nono.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postBySam.id,
      userId: beejay.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postBySam.id,
      userId: felix.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postBySam.id,
      userId: emily.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postBySam.id,
      userId: santa.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postBySam.id,
      userId: rudolph.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByGrace.id,
      userId: abe.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByEric.id,
      userId: beejay.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postBySam.id,
      userId: nancy.id,
    }),
    Reaction.create({
      name: 'like',
      postId: postByNancy.id,
      userId: rudolph.id,
    }),
  ]);

  const [notif1, notif2] = await Promise.all([
    Notification.create({
      type: 'follow',
      actingUserId: nono.id,
      userId: beejay.id,
    }),
    Notification.create({
      type: 'follow',
      actingUserId: emily.id,
      userId: beejay.id,
    }),
  ]);

  const [conv1, conv2] = await Promise.all([
    Conversation.create({
      members: [emily.id, nono.id],
    }),
    Conversation.create({
      members: [nono.id, beejay.id],
    }),
  ]);

  /* const [conv1, conv2] = await Promise.all([
    Conversation.create({
      member1: emily.id,
      member2: nono.id,
    }),
    Conversation.create({
      member1: nono.id,
      member2: beejay.id,
    }),
  ]); */

  const [msg1, msg2, msg3, msg4] = await Promise.all([
    Message.create({
      conversationId: conv1.id,
      senderId: emily.id,
      text: 'Hi Nono',
    }),
    Message.create({
      conversationId: conv1.id,
      senderId: nono.id,
      text: 'Hi Emily',
    }),
    Message.create({
      conversationId: conv2.id,
      senderId: nono.id,
      text: 'Hello',
    }),
    Message.create({
      conversationId: conv2.id,
      senderId: beejay.id,
      text: 'hello!',
    }),
  ]);

  return {
    users: {
      emily,
      felix,
      nono,
      beejay,
      grace,
      eric,
      santa,
      rudolph,
      sam,
      abe,
    },
    posts: {
      postByEmily,
      postByFelix,
      postWithCode,
      postByGrace,
      postByEric,
      postWithImg,
      postBySanta,
      postByRudolph,
      postBySam,
      postByAbe,
    },
    comments: {
      comment1,
      comment2,
      comment3,
      comment4,
      comment5,
      comment6,
      comment7,
      comment8,
      comment9,
      comment10,
      comment11,
      comment12,
    },
    reactions: {
      like1,
      like2,
      like3,
      like4,
      like5,
      like6,
      like7,
      like8,
      like9,
      like10,
      like11,
      like12,
      like13,
      like14,
      like15,
      like16,
    },
  };
};

module.exports = {
  syncAndSeed,
  conn,
  User,
  Relation,
  Post,
  Comment,
  Reaction,
  Interest,
  Group,
  Notification,
  Conversation,
  Message,
};
