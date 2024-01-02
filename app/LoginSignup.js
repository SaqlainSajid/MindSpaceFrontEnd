//I assume a main function will call either Login or Signup as needed
//I assume nothing is passed to the function when they are called (even though it would be useful to have the database connection passed)

function Login()
{
  //Step 1: Get user input
  //I assume that this will automatically translate to the screen we have
  //I also assume we only need from the user their name, email, and password
  //Lastly I assume that there is no requirements for the password (number of characters, contains --, etc.)
  const prompt = require('prompt-sync')();
  let userData = {};
  userData.name = prompt('NAME');
  userData.email = prompt('EMAIL');
  userData.password = prompt('PASSWORD', {noEcho:true});

  //Step 2: Get connection to database
  //Some specific words and phrases have been left out to be replaced when we make the database
  //I assume that each email-name combo will be unique (i.e. the primary key) in the database
  const { MongoClient } = require('mongodb');
  const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try
  {
    await client.connect();
    console.log('Connected to the database');
  }
  catch (error)
  {
    console.error('Error connecting to the database:', error);
  }
  //Could we maybe take out some of the error handling!?

  //Step 3: Find the user
  //Some specific words and phrases have been left out to be replaced when we make the database
  //I assume that each email-name combo will be unique (i.e. the primary key) in the database
  let userFound = false;
  const database = client.db('your_database_name');
  const collection = database.collection('users');
  while (!userFound)
  {
    try 
    {
      const userFromDatabase = await collection.findOne({ email: userData.email, name: userData.name });
      if (userFromDatabase)
      {
        userFound = true;
        if (userFromDatabase.password === userData.password)
        {
          console.log('Logged in successfully');
        }
        else
        {
          console.log('Incorrect password');
        }
      }
      else 
      {
        console.log('User not found');
        userData.name = prompt('NAME');
        userData.email = prompt('EMAIL');
        userData.password = prompt('PASSWORD', {noEcho:true});
      }
    } 
    catch (error)
    {
      console.error('Error checking user in the database:', error);
    } 
  }
  finally 
  {
    await client.close();
  }
  //Could we maybe take out some of the error handling!?

  //Step 4: Return the user info
  //I assume this will be needed for later
  return userData;
}

function Signup()
{
  //Step 1: Get user input
  //I assume that this will automatically translate to the screen we have
  //I also assume there is no need to check that the password is correct (asking for the password again and checking)
  //Lastly I assume that there is no requirements for the password (number of characters, contains --, etc.)
  const prompt = require('prompt-sync')();
  let userData = {};
  userData.name = prompt('NAME');
  userData.email = prompt('EMAIL');
  userData.password = prompt('PASSWORD', {noEcho:true});

  //Step 2: Get connection to database
  //Some specific words and phrases have been left out to be replaced when we make the database
  //I assume that each email-name combo will be unique (i.e. the primary key) in the database
  const { MongoClient } = require('mongodb');
  const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try
  {
    await client.connect();
    console.log('Connected to the database');
  }
  catch (error)
  {
    console.error('Error connecting to the database:', error);
  }
  //Could we maybe take out some of the error handling!?

  //Step 3: Add user to database
  //Some specific words and phrases have been left out to be replaced when we make the database
  //I assume that each email-name combo will be unique (i.e. the primary key) in the database
  let userFound = false;
  const database = client.db('your_database_name');
  const collection = database.collection('users');
  while (!userFound)
  {
    try 
    {
      const userFromDatabase = await collection.findOne({ email: userData.email, name: userData.name });
      if (userFromDatabase)
      {
        console.log('This name and email are being used');
        userData.name = prompt('NAME');
        userData.email = prompt('EMAIL');
        userData.password = prompt('PASSWORD', {noEcho:true});
      }
      else 
      {
        userFound = true;
        await collection.insertOne(userData);
        console.log('Account created successfully');
      }
    } 
    catch (error)
    {
      console.error('Error adding user in the database:', error);
    } 
  }
  finally 
  {
    await client.close();
  }
  //Could we maybe take out some of the error handling!?

  //Step 4: Return the user info
  //I assume this will be needed for later
  return userData;
}
