import data from './data';

const posts = [
  {
    imageUrl: require('../assets/kailash.jpg'),
    user: data[5].name,
    caption: 'Har Har Mahadev!',
    profilePic: data[5]['user'],
    likes: '180',
    comments: [
      {
        user: 'James',
        comments: 'Awesome, cannot wait to visit',
      },
      {
        user: 'King Kohli',
        comments: 'Jai Mahakaal',
      },
    ],
  },
  {
    imageUrl: require('../assets/beach.jpg'),
    user: data[0].name,
    caption: 'Lovely day at the beach',
    profilePic: data[0]['user'],
    likes: '120',
    comments: [
      {
        user: 'Michael',
        comments: 'Beautiful scenery!',
      },
      {
        user: 'Sophia',
        comments: 'Wish I was there!',
      },
    ],
  },
  {
    imageUrl: require('../assets/taj.jpg'),
    user: data[4].name,
    caption: 'Exploring new places!',
    profilePic: data[4]['user'],
    likes: '69',
    comments: [
      {
        user: 'Olivia',
        comments: 'Har Har Mahadev!',
      },
      {
        user: 'Noah',
        comments: 'What a view!',
      },
    ],
  },
  {
    imageUrl: require('../assets/adventure.jpg'),
    user: 'Isabella',
    caption: 'Adventures await!',
    profilePic: data[3]['user'],
    likes: '140',
    comments: [
      {
        user: 'Liam',
        comments: 'Where is this?',
      },
      {
        user: 'Ava',
        comments: 'I want to go too!',
      },
    ],
  },
  {
    imageUrl: require('../assets/waterfalls.jpg'),
    user: 'William',
    caption: 'Nature is calling',
    profilePic: data[2]['user'],
    likes: '169',
    comments: [
      {
        user: 'Emma',
        comments: "Let's go camping!",
      },
      {
        user: 'Alexander',
        comments: 'Amazing shot!',
      },
    ],
  },
  {
    imageUrl: require('../assets/sunset.jpg'),
    user: 'Charlotte',
    caption: 'Sunset vibes',
    profilePic: data[1]['user'],
    likes: '143',
    comments: [
      {
        user: 'Benjamin',
        comments: 'Stunning!',
      },
      {
        user: 'Amelia',
        comments: 'Wish I could be there!',
      },
    ],
  },
];

export default posts;
