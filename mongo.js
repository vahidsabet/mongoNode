const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true });
/*
client.connect((err) => {
	const collection = client.db('test').collection('devices');
	// perform actions on the collection object
	client.close();
});
*/
const createProduct = async (req, res, next) => {
	const newProduct = {
		name: req.body.name,
		price: req.body.price,
	};
	try {
		await client.connect();
		const collection = client.db('product_test').collection('products').insertOne(newProduct);	
		client.close();
	} catch (error) {
		return res.json({ message: 'Could not store data '+error });
    }
    //
    res.json(newProduct);
};

const getProducts = async (req, res, next) => {
    let products;
    try {
		await client.connect();
		 products = await client.db('product_test').collection('products').find().toArray();	
		
	} catch (error) {
		return res.json({ message: 'محصول وجود ندارد '+error });
    }
    //client.close();
    res.json(products); 

    
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
