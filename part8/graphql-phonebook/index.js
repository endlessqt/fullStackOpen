require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("useFindAndModify", false);

console.log("connecting to mongoDB");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("error", (err) => {
  console.log("problem with connection", err.message);
});
mongoose.connection.once("open", () => {
  console.log("hello from mongoose, you are connected to mongoDB");
});

// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ];

// let books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "The Demon",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"],
//   },
// ];

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    booksCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: (parent) => {
      const id = parent._id;
      const bookCountById = async (id) => {
        const books = await Book.find({ author: { $in: [id] } });
        return books.length;
      };
      return bookCountById(id);
    },
  },
  Query: {
    booksCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (parent, args) => {
      //return all books when no args
      const books = await Book.find({}).populate("author");
      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
  },
  Mutation: {
    addBook: async (parent, args) => {
      const authorInDB = await Author.findOne({ name: args.author });
      const book = new Book({
        ...args,
        author: authorInDB ? authorInDB._id : null,
      });
      if (!authorInDB) {
        const author = new Author({ name: args.author });
        const savedAuthor = await author.save();
        book.author = savedAuthor._id;
        await book.save();
        return book;
      }

      await book.save();
      return book;
    },
    editAuthor: (parent, args) => {
      const name = args.name;
      const author = authors.find((a) => a.name === name);
      if (!author) return null;
      const newAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === newAuthor.name ? newAuthor : a));
      return newAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
