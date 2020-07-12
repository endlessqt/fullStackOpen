const dummy = (arr) => {
  return 1;
};

const totalLikes = (arr) => {
  return arr.reduce((total, curr) => {
    return total + curr.likes;
  }, 0);
};

const favouriteBlog = (arr) => {
  if (arr.length === 0) return `no blogs`;
  if (arr.length === 1) {
    return {
      title: arr[0].title,
      author: arr[0].author,
      likes: arr[0].likes,
    };
  } else {
    const blog = arr.reduce((total, curr) => {
      if (curr.likes > total.likes) total = curr;
      return total;
    });

    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    };
  }
};

const mostBlogs = (arr) => {
  const sortedByBlogs = arr.reduce((total, curr) => {
    if (!total[curr.author]) {
      total[curr.author] = 1;
    } else {
      total[curr.author] += 1;
    }
    return total;
  }, {});

  let blogs = 0;
  let authorWithMax;

  for (let author in sortedByBlogs) {
    if (sortedByBlogs[author] > blogs) {
      blogs = sortedByBlogs[author];
      authorWithMax = author;
    }
  }
  return {
    author: authorWithMax,
    blogs: blogs,
  };
};
const mostLikes = (arr) => {
  const sortedByLikes = arr.reduce((total, curr) => {
    if (!total[curr.author]) {
      total[curr.author] = curr.likes;
    } else {
      total[curr.author] += curr.likes;
    }
    return total;
  }, {});
  let likes = 0;
  let authorWithMaxLikes;
  for (let author in sortedByLikes) {
    if (sortedByLikes[author] > likes) {
      likes = sortedByLikes[author];
      authorWithMaxLikes = author;
    }
  }
  return {
    author: authorWithMaxLikes,
    likes: likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
