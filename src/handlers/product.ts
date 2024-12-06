import { request, Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [['id', 'DESC']],
    // attributes: {exclude: ['createdAt', 'updatedAt', 'availability']}
    // attributes sirve para traerte solo lo necesitado del objeto
  });
  res.json({ data: products });
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({
        error: 'Producto No Encontrado',
      });
      return
    }

    res.json({ data: product })
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
    res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: 'Producto No Encontrado',
    });
    return
  }

  //Actualizar
  await product.update(req.body);
  //Almacena en base de datos
  await product.save();

  res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: 'Producto No Encontrado',
    });
    return
  }

  //Actualizar
  product.availability = !product.dataValues.availability;
  //Almacena en base de datos
  await product.save();

  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
     res.status(404).json({
      error: 'Producto No Encontrado',
    });
    return
  }

  //Elimina de la base de datos
  await product.destroy();
  res.json({ data: 'Producto Eliminado' });
};
