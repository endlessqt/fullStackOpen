require("dotenv").config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const Book = require("./models/Book");
const User = require("./models/User");
const Author = require("./models/Author");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

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

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
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
    me: User
  }
  type Mutation {
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
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
      if (args.author && args.genre) {
        const books = await Book.find({
          genres: { $in: [args.genre] },
        }).populate("author");
        return books.filter(
          (b) => b.author.name.toLowerCase() === args.author.toLowerCase()
        );
      } else if (args.author || args.genre) {
        const arg = args.author ? args.author : args.genre;
        if (arg === args.genre) {
          const books = await Book.find({ genres: { $in: [arg] } }).populate(
            "author"
          );
          return books;
        } else if (arg === args.author) {
          const author = await Author.findOne({ name: arg });
          const authorId = author._id;

          const booksByAuthor = await Book.find({ author: authorId }).populate(
            "author"
          );
          return booksByAuthor;
        }
      } else {
        return books;
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
    me: (parent, args, context) => context.user,
  },
  Mutation: {
    addBook: async (parent, args, context) => {
      const { user } = context;
      if (!user)
        throw new AuthenticationError("you have no permission to do dat");
      const authorInDB = await Author.findOne({ name: args.author });
      const book = new Book({
        ...args,
        author: authorInDB ? authorInDB._id : null,
      });
      if (!authorInDB) {
        try {
          const author = new Author({ name: args.author });
          const savedAuthor = await author.save();
          book.author = savedAuthor._id;
          const newBook = await book.save();
          const returnedBook = await Book.findById(newBook._id).populate(
            "author"
          );
          return returnedBook;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      try {
        const newBook = await book.save();
        const returnedBook = await Book.findById(newBook._id).populate(
          "author"
        );
        return returnedBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (parent, args, context) => {
      const { user } = context;
      if (!user)
        throw new AuthenticationError("you have no permission to do dat");
      const name = args.name;
      const year = args.setBornTo;
      const author = await Author.findOne({ name });
      author.born = year;
      try {
        await author.save();
        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (parent, args) => {
      const username = args.username;
      const favouriteGenre = args.favouriteGenre;
      const user = new User({
        username,
        favouriteGenre,
      });
      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (parent, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user || password !== "fullstackopen") {
        throw new UserInputError(
          "u have no account or trying to sign with wrong credentials"
        );
      }
      const usersToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(usersToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const user = await User.findById(decodedToken.id);
      return { user };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
