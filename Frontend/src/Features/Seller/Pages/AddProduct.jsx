import React, { useEffect, useState } from "react";
import { useProducts } from "../../Dashboard/Hook/useProducts";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowLeft, FiPlus, FiTrash2, FiImage } from "react-icons/fi";

const AddProduct = () => {
  const { handleCreateProducts, handleGetProductDetails, handleUpdateProduct } =
    useProducts();
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      handleGetProductDetails(id);
    }
  }, [id]);

  const product = useSelector((state) => state.product.productsDetails);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [variants, setVariants] = useState([
    {
      size: "",
      color: "",
      stock: "",
      price: { amount: "", currency: "INR", discount: "", mrp: "" },
      images: [],
    },
  ]);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        size: "",
        color: "",
        stock: "",
        price: { amount: "", currency: "INR", discount: "", mrp: "" },
        images: [],
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value, nestedField = null) => {
    setVariants((prev) =>
      prev.map((variant, i) => {
        if (i === index) {
          if (nestedField) {
            return {
              ...variant,
              [field]: { ...variant[field], [nestedField]: value },
            };
          }
          return { ...variant, [field]: value };
        }
        return variant;
      }),
    );
  };

  const handleVariantImageChange = (index, e) => {
    const files = Array.from(e.target.files);

    setVariants((prev) =>
      prev.map((variant, i) => {
        if (i === index) {
          const totalImages = variant.images.length + files.length;
          if (totalImages > 7) {
            alert(`Max 7 images per variant allowed.`);
            const allowedFiles = files.slice(0, 7 - variant.images.length);
            return { ...variant, images: [...variant.images, ...allowedFiles] };
          }
          return { ...variant, images: [...variant.images, ...files] };
        }
        return variant;
      }),
    );
  };

  const removeVariantImage = (variantIndex, imageIndex) => {
    setVariants((prev) =>
      prev.map((variant, i) => {
        if (i === variantIndex) {
          return {
            ...variant,
            images: variant.images.filter((_, j) => j !== imageIndex),
          };
        }
        return variant;
      }),
    );
  };

  // 🔥 TERA ORIGINAL SUBMIT FUNCTION (Bina kisi chhed-chhad ke)
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    const variantsData = variants.map((v) => ({
      size: v.size,
      color: v.color,
      stock: Number(v.stock),
      price: {
        amount: Number(v?.price?.amount),
        currency: v?.price?.currency,
        discount: Number(v?.price?.discount) || 0,
        mrp: Number(v?.price?.mrp),
      },
    }));

    formData.append("variants", JSON.stringify(variantsData));

    variants.forEach((variant, index) => {
      variant.images.forEach((file) => {
        formData.append(`variant_${index}`, file);
      });
    });

    if (isEdit) {
      handleUpdateProduct(id, formData);
    } else {
      handleCreateProducts(formData);
    }
  };

  useEffect(() => {
    if (product?.variants && isEdit) {
      setTitle(product.title);
      setDescription(product.description);
      setCategory(product.category);

      setVariants(
        product.variants.map((v) => ({
          size: v.size,
          color: v.color,
          stock: v.stock,
          price: v.price,
          images: v.image || [],
        })),
      );
    }
  }, [product]);

  return (
    <section className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] pb-32">
      {/* HEADER WITH WORKING BACK BTN AND TOP SUBMIT BTN */}
      <div className="w-full px-6 md:px-12 py-4 flex justify-between items-center sticky top-0 z-40 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FiArrowLeft size={18} /> Back
          </button>
          <div className="w-px h-6 bg-[var(--border-color)] hidden md:block"></div>
          <h1 className="text-lg font-bold tracking-tight uppercase">
            {isEdit ? "Update Product" : "Add Product"}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          {isEdit ? "Save Changes" : "Push to Database"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-12"
      >
        {/* BASIC INFORMATION */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[var(--border-color)] pb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Product Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] py-3 outline-none text-xl font-medium transition-colors placeholder:text-[var(--text-secondary)]/40"
                placeholder="Enter product title"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] py-3 outline-none text-xl font-medium transition-colors uppercase appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-black bg-white">
                  Select Category
                </option>
                <option value="shirts" className="text-black bg-white">
                  Shirts
                </option>
                <option value="tshirts" className="text-black bg-white">
                  T-Shirts
                </option>
                <option value="jeans" className="text-black bg-white">
                  Jeans
                </option>
                <option value="hoodies" className="text-black bg-white">
                  Hoodies
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-2 lg:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Description *
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] p-4 outline-none text-lg transition-colors placeholder:text-[var(--text-secondary)]/40 resize-none"
                placeholder="Product description..."
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* VARIANTS SECTION */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-6 border-b border-[var(--border-color)] pb-4">
            <h2 className="text-xl font-bold uppercase tracking-widest">
              Variants
            </h2>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-[var(--border-color)] px-4 py-2 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all"
            >
              <FiPlus size={14} /> Add Variant
            </button>
          </div>

          <div className="flex flex-col gap-10">
            {variants.map((variant, vIndex) => (
              <div
                key={vIndex}
                className="relative border border-[var(--border-color)] bg-[var(--bg-secondary)]/10 p-6 md:p-8"
              >
                {/* Variant Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--border-color)]">
                  <p className="text-sm font-bold tracking-widest text-[var(--text-secondary)] uppercase">
                    Variant {vIndex + 1}
                  </p>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(vIndex)}
                      className="flex items-center gap-2 text-red-500 text-xs uppercase tracking-widest hover:text-red-600 font-bold px-3 py-1.5 transition-colors"
                    >
                      <FiTrash2 /> Remove
                    </button>
                  )}
                </div>

                {/* Attributes Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Size *
                    </label>
                    <select
                      value={variant.size}
                      onChange={(e) =>
                        updateVariant(vIndex, "size", e.target.value)
                      }
                      required
                      className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] pb-2 outline-none text-lg uppercase cursor-pointer"
                    >
                      <option value="" disabled className="text-black bg-white">
                        Size
                      </option>
                      {["S", "M", "L", "XL", "XXL"].map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="text-black bg-white"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Color *
                    </label>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) =>
                        updateVariant(vIndex, "color", e.target.value)
                      }
                      className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] pb-2 outline-none text-lg capitalize placeholder:text-[var(--text-secondary)]/30"
                      placeholder="e.g. Black"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Stock *
                    </label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) =>
                        updateVariant(vIndex, "stock", e.target.value)
                      }
                      className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] pb-2 outline-none text-lg placeholder:text-[var(--text-secondary)]/30"
                      placeholder="0"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Currency
                    </label>
                    <select
                      value={variant.price.currency}
                      onChange={(e) =>
                        updateVariant(
                          vIndex,
                          "price",
                          e.target.value,
                          "currency",
                        )
                      }
                      className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] pb-2 outline-none text-lg uppercase cursor-pointer"
                    >
                      <option value="INR" className="text-black bg-white">
                        INR
                      </option>
                      <option value="USD" className="text-black bg-white">
                        USD
                      </option>
                    </select>
                  </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      MRP *
                    </label>
                    <input
                      type="number"
                      value={variant.price.mrp}
                      onChange={(e) =>
                        updateVariant(vIndex, "price", e.target.value, "mrp")
                      }
                      className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] pb-2 outline-none text-2xl"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-primary)] font-bold">
                      Selling Price *
                    </label>
                    <input
                      type="number"
                      value={variant.price.amount}
                      onChange={(e) =>
                        updateVariant(vIndex, "price", e.target.value, "amount")
                      }
                      className="w-full bg-transparent border-b-2 border-[var(--text-primary)] pb-2 outline-none text-2xl font-bold"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Discount %
                    </label>
                    <input
                      type="number"
                      value={variant.price.discount}
                      onChange={(e) =>
                        updateVariant(
                          vIndex,
                          "price",
                          e.target.value,
                          "discount",
                        )
                      }
                      className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] pb-2 outline-none text-2xl placeholder:text-[var(--text-secondary)]/30"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Images Upload */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                      Images
                    </label>
                    <span className="text-xs font-bold font-mono">
                      {variant.images.length} / 7
                    </span>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                    {variant.images.length < 7 && (
                      <label className="aspect-[3/4] border border-dashed border-[var(--border-color)] hover:border-[var(--text-primary)] flex flex-col items-center justify-center cursor-pointer transition-colors bg-transparent">
                        <FiImage className="text-2xl text-[var(--text-secondary)] mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                          Upload
                        </span>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleVariantImageChange(vIndex, e)}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    )}

                    {variant.images.map((img, iIndex) => (
                      <div
                        key={iIndex}
                        className="aspect-[3/4] bg-[var(--bg-secondary)] relative group border border-[var(--border-color)] overflow-hidden"
                      >
                        <img
                          src={
                            typeof img === "string"
                              ? img
                              : URL.createObjectURL(img)
                          }
                          alt={`img-${iIndex}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeVariantImage(vIndex, iIndex)}
                            className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>

      {/* STICKY BOTTOM BUTTON (Backup for easy access, properly tied to original JS handler) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-[var(--bg-primary)] border-t border-[var(--border-color)] z-50 flex items-center justify-between shadow-lg">
        <p className="hidden md:block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">
          {isEdit ? "Editing Mode" : "Creation Mode"}
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full md:w-auto bg-[var(--text-primary)] text-[var(--bg-primary)] px-12 py-4 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-80"
        >
          {isEdit ? "Update Product" : "Publish Product"}
        </button>
      </div>
    </section>
  );
};

export default AddProduct;
