const express = require(`express`)

const app = express()
app.use(express.json())
app.use(express.text())

// Static array
const arrayData = [
    {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      hide: false
    },
    {
      postId: 1,
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
      hide: false
    },
    {
      postId: 1,
      id: 3,
      name: "odio adipisci rerum aut animi",
      email: "Nikita@garfield.biz",
      body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
      hide: false
    }
  ];

// CRUD
app.get('/posts', (req, res) => {
    const visiblePosts = arrayData.filter(item => !item.hide);
    res.json(visiblePosts);

    res.end();
});

app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = arrayData.find(item => item.id === id && !item.hide);
    
    if (!post)
        return res.status(404).json({ error: 'Error, post not found' });
    
    res.json(post);

    res.end();
});

app.post('/posts', (req, res) => {
    const header = req.headers;
    if (header.somekey !== "secret")
        return res.status(404).json({ error: 'Error, wrong key' });    

    const { 
        postId, 
        name, 
        email, 
        body 
    } = req.body;

    if (!postId || !name || !email || !body) 
        return res.status(400).json({ error: 'Error, require a field' });
    
    const newPost = {
        postId,
        id: arrayData.length + 1,
        name,
        email,
        body,
        hide: false
    };

    arrayData.push(newPost);
    res.status(201).json({
        message: 'Create successfully',
        newPost,
        arrayData
    })

    res.end();
});

app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = arrayData.findIndex(item => item.id === id);

    if (postIndex === -1) 
        return res.status(404).json({ error: 'Error, post not found' });
    
    const { 
        postId, 
        name, 
        email, 
        body 
    } = req.body;

    if (!postId || !name || !email || !body) 
        return res.status(400).json({ error: 'Error, require a field' });
    
    arrayData[postIndex] = {
    ...arrayData[postIndex],
    postId,
    name,
    email,
    body
    };

    res.json(arrayData[postIndex]);

    res.end();
});

app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = arrayData.findIndex(item => item.id === id);
  
    if (postIndex === -1)
        return res.status(404).json({ error: 'Error, post not found' });
    
    if (arrayData[postIndex].hide == true)
        return res.status(404).json({ error: 'Error, post not found (hide)' });
    
    arrayData[postIndex].hide = true; 
    res.json({ message: 'Deleted post succesfully', arrayData }); 
    
    res.end();
});

app.listen(3000, () => {console.log("APi is working on port 3000")})