import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllProducts, formatPrice } from "@/data/productData";

const products = getAllProducts();

const ProductCatalogSection = () => {
  return (
    <section id="products" className="py-20 bg-secondary/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
            Shop Pak Track Pro
          </h2>
          <p className="text-muted-foreground">
            Choose the tracker package that fits your personal or business
            needs. Cash on Delivery available across Pakistan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className="card-elevated overflow-hidden card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="aspect-[4/3] bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "/pak-track.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <Link
                    to={`/products/${product.slug}`}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogSection;
