const getNotices = (req, res) =>
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: 'Episode 1 Revision Completed',
      datetime: '2019-04-09',
      type: 'notification',
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: 'Episode 1 Completed',
      datetime: '2019-04-07',
      type: 'notification',
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: 'Episode 1 Submitted',
      datetime: '2019-04-07',
      type: 'notification',
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'New Message From Bianca!',
      datetime: '2019-04-07',
      type: 'notification',
    },
    {
      id: '000000006',
      avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=B',
      title: 'Re: Using FLAC',
      description: "You're very welcome!",
      datetime: '2019-04-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000007',
      avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=B',
      title: 'Re: Using FLAC',
      description: "That shouldn't be an issue - please let me know if you have any problems ...",
      datetime: '2019-04-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000008',
      avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=B',
      title: 'Re: Using FLAC',
      description: 'Hey Jessica! Flac files are absolutely fine, just keep in mind...',
      datetime: '2019-04-07',
      type: 'message',
      clickClose: true,
    },
  ]);

export default {
  'GET /api/notices': getNotices,
};
