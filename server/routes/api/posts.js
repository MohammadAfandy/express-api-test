const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET POSTS
router.get('/', async(req, res) => {
	const posts = await loadPostCollection();

	res.send(await posts.find({}).toArray());
});

// ADD POSTS
router.post('/', async(req, res) => {
	const posts = await loadPostCollection();
	await posts.insertOne({
		text: req.body.text,
		createdAt: new Date()
	});

	res.status(201).send();
});

// DELETE POSTS
router.delete('/:id', async(req, res) => {
	const posts = await loadPostCollection();
	await posts.deleteOne({
		_id: new mongodb.ObjectID(req.params.id)
	});

	res.status(200).send();
});

async function loadPostCollection() {
	const client = await mongodb.MongoClient.connect(
		'mongodb+srv://mohafandy:liverpool1892@cluster0-spmz4.mongodb.net/vueexpress?retryWrites=true',
		{ useNewUrlParser: true }
	);

	return client.db('vueexpress').collection('posts');
}

module.exports = router;