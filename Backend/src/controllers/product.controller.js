import sharp from "sharp";
import productModel from "../models/Product.model.js";
import { uploadFile } from "../services/storage.service.js";
import z, { string } from "zod";
import { containsBadWords } from "../utils/profanityFilter.js";
import userModel from "../models/auth.models.js";

export const createProduct = async (req, res) => {
  let { title, description, category, variants } = req.body;

  if (typeof variants === "string") {
    variants = JSON.parse(variants);
  }

  if (containsBadWords(title) || containsBadWords(description)) {
    return res.status(400).json({
      success: false,
      message:
        "Inappropriate language or profanity is not allowed in the Title or Description.",
    });
  }

  for (let v of variants) {
    if (containsBadWords(v.color) || containsBadWords(v.size)) {
      return res.status(400).json({
        success: false,
        message:
          "Inappropriate language is not permitted in the Variant fields (Color/Size).",
      });
    }
  }
  console.log(typeof req.body.variants);
  console.log(req.body.variants);

  const finalVariants = await Promise.all(
    variants.map(async (variant, index) => {
      const files = req.files[`variant_${index}`] || [];

      const uploadedImages = await Promise.all(
        files.map(async (file, i) => {
          const webpBuffer = await sharp(file.buffer)
            .webp({ quality: 80 })
            .toBuffer();

          const fileName = `product_${Date.now()}_${index}_${i}.webp`;

          const uploaded = await uploadFile({
            buffer: webpBuffer,
            fileName,
          });
          //  AI MODERATION CHECK (Updated Name)
          const aiStatus = uploaded.extensionStatus?.["aws-auto-tagging"];

          if (aiStatus === "success") {
            const explicitKeywords = [
              "Explicit",
              "Nudity",
              "Weapon",
              "Violence",
              "Gore",
            ];

            const explicitContent = uploaded.AITags?.some((tag) =>
              explicitKeywords.includes(tag.name),
            );

            if (explicitContent) {
              console.log("NSFW Tag Found:", uploaded.AITags);
              throw new Error(
                "Ganda content (NSFW) detect hua hai! Image upload block kar di gayi hai.",
              );
            }
          } else if (aiStatus === "failed") {
            console.log(
              "AI Tagging fail ho gaya ya Free Tier me limit hit ho gayi.",
            );
          }

          return uploaded.url;
        }),
      );

      return {
        size: variant.size.toUpperCase(),
        color: variant.color.toLowerCase(),
        stock: variant.stock,
        price: variant.price,
        image: uploadedImages,
      };
    }),
  );
  const seen = new Set();

  for (let v of finalVariants) {
    const key = v.size + "-" + v.color;

    if (seen.has(key)) {
      return res.status(400).json({
        message: "Duplicate variant not allowed",
      });
    }

    seen.add(key);
  }
  const seller = req.user;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ message: "Please upload at least one image" });
  }

  for (const variantKey in req.files) {
    if (req.files[variantKey].length > 7) {
      return res.status(400).json({
        message: `Max 7 images allowed per variant. You exceeded limit in ${variantKey}`,
      });
    }
  }
  const allowedCategories = ["shirts", "tshirts", "jeans", "hoodies"];
  if (!allowedCategories.includes(req.body.category)) {
    return res.status(400).json({
      message: "Invalid category",
    });
  }

  const product = await productModel.create({
    title,
    description,
    category,
    seller: req.user._id,
    variants: finalVariants,
  });

  res.status(201).json({
    message: "Product created successfully",
    success: true,
    product,
  });
};

export const getSellerProducts = async (req, res) => {
  const seller = req.user;
  const products = await productModel.find({ seller: seller._id });
  res.status(200).json({
    message: "Product fetched successfully",
    success: true,
    products,
  });
};

export const deleteSellerProducts = async (req, res) => {
  const seller = req.user;
  const productId = req.params.id;
  const product = await productModel.findByIdAndDelete(productId);
  if (!product) {
    return res.status(400).json({
      message: "products not found",
      product,
    });
  }
  res.status(200).json({
    message: "Product delete successfully",
    success: true,
    product,
  });
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    let { title, description, category, variants } = body;
    console.log("BODY:", req.body); // 👈 ADD THIS
    console.log("FILES:", req.files); // 👈 ADD THIS
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 parse variants
    if (typeof variants === "string") {
      variants = JSON.parse(variants);
    }

    // 🔥 update basic fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;

    // 🔥 variants processing (IMPORTANT)
    const finalVariants = await Promise.all(
      variants.map(async (variant, index) => {
        const files = req.files?.[`variant_${index}`] || [];

        let uploadedImages = [];

        // 🟢 CASE 1: new images upload
        if (files.length > 0) {
          uploadedImages = await Promise.all(
            files.map(async (file, i) => {
              const webpBuffer = await sharp(file.buffer)
                .webp({ quality: 80 })
                .toBuffer();

              const fileName = `product_${Date.now()}_${index}_${i}.webp`;

              const uploaded = await uploadFile({
                buffer: webpBuffer,
                fileName,
              });

              return uploaded.url;
            }),
          );
        } else {
          // 🔴 CASE 2: old images preserve
          uploadedImages = product.variants[index]?.image || [];
        }

        return {
          size: variant.size.toUpperCase(),
          color: variant.color.toLowerCase(),
          stock: variant.stock,
          price: variant.price,
          image: uploadedImages,
        };
      }),
    );

    product.variants = finalVariants;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Update failed",
    });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await productModel.find().sort({ createdAt: -1 }).limit(8);
  res.status(200).json({
    message: "AllProduct fetched successfully",
    success: true,
    products,
  });
};

export const getProductsDetails = async (req, res) => {
  const productId = req.params.id;
  const products = await productModel.findById(productId);
  res.status(200).json({
    message: "ProductDetails fetched successfully",
    success: true,
    products,
  });
};

export const ProductCategory = async (req, res) => {
  const { category, sort } = req.query;
  let filter = {};
  let sortOption = {};
  if (category) {
    let categories = category.split(",");
    filter.category = { $in: categories };
  }

  if (sort === "newest") {
    sortOption = { createdAt: -1 };
  }

  if (sort === "price-low") {
    sortOption = { "Variants.price.amount": 1 };
  }

  if (sort === "price-high") {
    sortOption = { "variants.price.amount": -1 };
  }

  const products = await productModel.find(filter).sort(sortOption);

  res.status(200).json({
    message: "Products fetched by category",
    success: true,
    products,
  });
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    //  empty search
    if (!query || query.trim() === "") {
      return res.status(200).json({
        success: true,
        products: [],
      });
    }

    const products = await productModel
      .find({
        $or: [
          {
            title: { $regex: query.split("").join(".*"), $options: "i" },
          },
          { description: { $regex: query, $options: "i" } },
        ],
      })
      .select("title variants")
      .limit(15);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};

export const searchHistory = async (req, res) => {
  try {
    const { searchQuery } = req.body;
    const user = req.user;

    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({ message: "Query required" });
    }

    let history = user.searchHistory || [];
    history = history.filter((e) => e != searchQuery);
    history.unshift(searchQuery);
    history = history.slice(0, 5);
    user.searchHistory = history;
    await user.save();
    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving history" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      history: user.searchHistory || [],
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
};

export const wishList = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    // 1. Check karo ki product sach mein exist karta hai ya nahi
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const isAlreadySaved = user.wishList.some(
      (savedId) => savedId.toString() === id.toString(),
    );

    if (isAlreadySaved) {
      user.wishList = user.wishList.filter(
        (savedId) => savedId.toString() !== id.toString(),
      );
    } else {
      user.wishList.push(product._id);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: isAlreadySaved ? "Removed from Wishlist" : "Added to Wishlist",
      wishList: user.wishList,
    });
  } catch (error) {
    console.error("Wishlist Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating wishlist" });
  }
};

export const getSavedProducts = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("wishList");
    res.status(200).json({
      success: true,
      wishList: user.wishList,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Saved Porducts FetchedError",
    });
  }
};
