import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'Nom',
    slug: 'slug' + Math.random(),
    image: '/images/shirt1.jpg',
    price: 0,
    category: 'Categorie',
    brand: 'Marque',
    countInStock: 0,
    description: 'Description',
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Produit créé', product });
});

export default handler;
