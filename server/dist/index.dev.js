"use strict";

require('dotenv').config();

var express = require('express');

var helmet = require('helmet');

var cors = require('cors');

var mongoose = require('mongoose');

var _require = require('express-graphql'),
    graphqlHTTP = _require.graphqlHTTP;

var app = express();
app.use(express.json());
app.use(helmet());
app.use(cors()); // app.use(cors({
//   origin: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : 'http://localhost:3000'
// }));

var rootSchema = require('./graphql/schema');

var rootResolver = require('./graphql/resolvers');

var isAuth = require('./middlewares/isAuth');

app.get('/', function (req, res) {
  res.json({
    message: "Hello"
  });
}); //auth middleware

app.use(isAuth); //graphql

app.use('/graphql', graphqlHTTP({
  schema: rootSchema,
  rootValue: rootResolver,
  graphiql: true
}));

var user = require('./routes/user');

var post = require('./routes/post');

app.use('/api/user', user);
app.use('/api/post', post);

var errorHandlers = require('./middlewares/errorHandlers');

app.use(errorHandlers.notFound);
app.use(errorHandlers.errorHandler);
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Database connected");
})["catch"](function (err) {
  console.log("Database connection error: ".concat(err));
});
var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("Listening at http://localhost:".concat(port));
});