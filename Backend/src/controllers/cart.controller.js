import cartModel from "../models/cart.model.js";
import productModel from "../models/Product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, variantId, quantity } = req.body;
    const userId = req.user._id;
    if (!productId || !variantId) {
      return res.status(400).json({
        message: "Missing data",
      });
    }
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        items: [],
      });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      return res.status(400).json({
        message: "variants not found",
      });
    }

    let qty = quantity || 1;
    if (qty > variant.stock) {
      return res.status(404).json({
        message: "This product is out of stock.",
      });
    }
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId,
    );

    if (existingItem) {
      if (existingItem.quantity + qty > variant.stock) {
        return res.status(400).json({
          message: "Stock limit exceeded",
        });
      }
      existingItem.quantity += qty;
    } else {
      cart.items.push({
        product: productId,
        variant: variantId,
        quantity: qty,
        priceAtPurchase: variant.price.amount,
        size: variant.size,
        color: variant.color,
        image: variant.image[0],
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Cart added successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const removeCartItems = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const userId = req.user._id;
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({
        message: "cart not found",
      });
    }

    const ItemsExists = cart.items.some(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId,
    );

    if (!ItemsExists) {
      return res.status(404).json({
        message: "Items not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.variant.toString() === variantId
        ),
    );

    await cart.save();
    res.status(200).json({
      message: "Cart items removed successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateCartItems = async (req, res) => {
  try {
    const { productId, variantId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      return res.status(404).json({
        message: "Variant not found",
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId,
    );

    if (!existingItem) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) =>
          !(
            item.product.toString() === productId &&
            item.variant.toString() === variantId
          ),
      );
    } else {
      if (quantity > variant.stock) {
        return res.status(400).json({
          message: "Stock limit exceeded",
        });
      }

      existingItem.quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(200).json({
        cart: { items: [] },
      });
    }

    res.status(200).json({
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
