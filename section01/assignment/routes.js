const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // if '/' then serve html with form 
  if (url === '/' && method === 'GET'){
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>Home</title></head>')
    res.write('<body><h1>Assignemnt 1</h1><form method="POST" action="/users"><input type="text" name="username"><button>Create User</button></form></body>')
    res.write('</html>');
    return res.end()
  }

  // if '/users' then serve html with list of users
  if (url === '/users' && method === 'GET'){
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>Users</title></head>')
    res.write('<body><h1>Users</h1><ul id="users"><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>')
    res.write('</html>');
    return res.end();
  }

  // If we are trying to post to users 
  if (url === '/users' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    })

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split('=')[1];
      console.log(user)
      res.statusCode = 302;
      res.setHeader('Location', '/')
      return res.end();
    })
  } 


  // default serve greeting
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>');
  res.write('<head><title>Users</title></head>')
  res.write('<body><h1>Page not found</h1></body>')
  res.write('</html>');
  res.end();
}

module.exports = requestHandler;