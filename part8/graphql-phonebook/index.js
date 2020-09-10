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
        const newBook = await book.save();
        const returnedBook = await Book.findById(newBook._id).populate(
          "author"
        );
        return returnedBook;
      }

      const newBook = await book.save();
      const returnedBook = await Book.findById(newBook._id).populate("author");
      return returnedBook;
    },
    editAuthor: async (parent, args) => {
      const name = args.name;
      const year = args.setBornTo;
      const author = await Author.findOne({ name });
      author.born = year;
      await author.save();
      return author;
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
