import express from 'express';
import {MongoClient, ServerApiVersion} from 'mongodb';

const app = express();
app.use(express.json());

let db;

async function connectToDatabase() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    db = client.db('my-mongodb');
}

app.get('/api/articles', async(req, res) => {
    const articleName = req.params.name;
    const articles = await db.collection('articles');

   if (articles) {
        res.status(200).json(articles);
    } else {
        res.status(404).send('Articles not found');
    }
});

app.get('/api/articles/:name', async(req, res) => {
    const articleName = req.params.name;
    const article = await db.collection('articles').findOne({articleName});

   if (article) {
        res.status(200).json(article);
    } else {
        res.status(404).send('Article not found');
    }
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    const articleName = req.params.name;
    const updatedArticle = await db.collection('articles').findOneAndUpdate({articleName}, {
        $inc: {upvotes: 1},
    }, {
        returnDocument: 'after',
    });
    
    res.status(200).json(updatedArticle);
});

app.post('/api/articles/:name/comment', async(req, res) => {
    const articleName = req.params.name;
    const {postedBy, text} = req.body;
    const newComment = {
        postedBy,
        text,
    };
    const updatedArticle = await db.collection('articles').findOneAndUpdate({articleName}, {
        $push: {comments: newComment},
    }, {
        returnDocument: 'after',
    });
    res.status(200).json(updatedArticle);
});

function startServer() {
    connectToDatabase();
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}
startServer();


