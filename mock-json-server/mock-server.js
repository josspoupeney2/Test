// This is responsible to create the mock server.
const jsonServer = require('json-server');
const Axios = require('axios');
const {
  generateDemoInfo, getBotRooms, mockInstances, initMockNotifications,
} = require('./mock-file');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const CLIENT_ID = "Iv1.c1733d968e98b178"
const CLIENT_SECRET = "28f41218457f9ccbdce03292909bdf5d487d2e4e"
let isAuthenticated = false;
var ACCESS_TOKEN = ""
// Mock delay, for testing loading states. Units are in ms.
const MOCK_DELAY = 1000;

function send(callback, delay = MOCK_DELAY) {
  if (MOCK_DELAY) {
    setTimeout(callback, delay);
  } else {
    callback();
  }
}

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

server.get('/api/github/authenticate', (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
})

server.get('/api/github/authorize', async (req, res) => {
  const payload = await Axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: req.query.code
    },
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );
  console.log('Access token = ' + payload.data.access_token);
  ACCESS_TOKEN = payload.data.access_token
  isAuthenticated = true;
  res.redirect('https://localhost:4000');
});

server.get('/api/github/repos', async (req, res) => {
  const payload = await Axios.get(
    'https://api.github.com/user/repos',
    {
      headers: {
        'Authorization': 'token '+ ACCESS_TOKEN
      }
    }
  )
  res.send(payload.data);
});

server.get('/api/isAuthenticated', (req, res) => {
  res.send({'isAuthenticated': isAuthenticated});
})

server.post('/api/parser', async (req, res) => {
  const payload = await Axios.post('https://renderer-tool.app.symphony.com/api/parser', req.body);
  res.json(payload.data).status(200).end();
});

/*
  -- Application sample
  Sample endpoint, serving a very simple body payload, to show an example of how to externalize
  mock content.
  It can - and should - be deleted when developing your own integration.
*/
// Project specific APIs
server.get('/v1/sym/rooms', (req, res) => {
  console.log('Get Bot Rooms!');
  send(() => res.jsonp(getBotRooms()));
});

server.get('/v1/sym/bot-info', (req, res) => {
  send(() => res.jsonp({ username: 'pagerduty_bot' }));
});

server.post('/application/authenticate', (req, res) => {
  res.sendStatus(200);
});

server.post('/application/tokens/validate', (req, res) => {
  res.sendStatus(200);
});

server.post('/application/jwt/validate', (req, res) => {
  res.sendStatus(200);
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});

// --- Instances
server.get('/v1/instances', (req, res) => {
  send(() => res.jsonp(mockInstances));
});

// --- Notifications
const mockNotifications = initMockNotifications;
server.get('/v1/notifications', (req, res) => {
  send(() => res.jsonp(mockNotifications));
});

server.post('/v1/notifications', (req, res) => {
  const newId = `${mockNotifications.length + 1}`;
  mockNotifications.push({
    instance_id: req.body.instance_id,
    name: req.body.name,
    is_editable: true,
    id: newId,
  });
  send(() => res.jsonp(newId));
});

server.put('/v1/notifications/:id', (req, res) => {
  const editIndex = mockNotifications.findIndex(el => el.id === req.params.id);
  if (editIndex < 0) {
    send(() => res.sendStatus(404));
  } else {
    mockNotifications[editIndex] = {
      ...mockNotifications[editIndex],
      name: req.body.name,
      instance_id: req.body.instance_id,
    };
    send(() => res.sendStatus(200));
  }
});

server.delete('/v1/notifications/:id', (req, res) => {
  const indexOfDelete = mockNotifications.findIndex(el => el.id === req.params.id);
  if (indexOfDelete < 0) {
    send(() => res.sendStatus(404));
  }
  mockNotifications.slice(mockNotifications.findIndex(el => el.id === req.params.id), 1);
  console.log(mockNotifications);
  send(() => res.sendStatus(200));
});
