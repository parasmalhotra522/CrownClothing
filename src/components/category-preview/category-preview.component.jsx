import "./category-preview.component.scss";
import ProductCard from "../product-card/product-card.component";
import { useNavigate, Link } from "react-router-dom";
import { Fragment } from "react";

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate();

    return (
        <div className="category-preview-container">


            <h2>
                <Link className="title" to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className="preview">
                {
                    products.filter((_, index) => index < 4)
                        .map((product) =>
                            <ProductCard key={product.id} product={product} ></ProductCard>
                        )
                }
            </div>




        </div>
    );

}

export default CategoryPreview;
