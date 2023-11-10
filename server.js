const express = require('express');
const mysql = require('mysql');
const yahooFantasy = require('yahoo-fantasy');

const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'fantasy_football'
});

connection.connect();

const yf = yahooFantasy.create({
  consumer_key: 'your_consumer_key',
  consumer_secret: 'your_consumer_secret',
  access_token: 'your_access_token',
  access_token_secret: 'your_access_token_secret',
  oauth: {
    consumer_key: 'dj0yJmk9MjczQ0lNeUxmOWI0JmQ9WVdrOWFXeHFNME5FVkVzbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWM2',
    consumer_secret: 'd46ac8a30b7b20482d1ad6da4fd4892af69b019f'
  }
});

// Retrieve league data from Yahoo Fantasy Sports API
yf.league.standings('league_key', function(err, data) {
  if (err) throw err;

  // Store the league data in the database
  const teams = data.standings[0].teams;
  teams.forEach(function(team) {
    const query = `INSERT INTO teams (name, rank, wins, losses, ties, points_for, points_against) VALUES ('${team.name}', ${team.rank}, ${team.wins}, ${team.losses}, ${team.ties}, ${team.points_for}, ${team.points_against})`;
    connection.query(query, function(err, result) {
      if (err) throw err;
      console.log(`Inserted ${team.name} into database`);
    });
  });
});

// Start the server
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});