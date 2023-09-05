import { CategoryContainer } from  "./category.styles.jsx";
import { useParams } from "react-router-dom";
import  { useSelector } from 'react-redux';
import { useState, useEffect, Fragment } from "react";
import { selectcategoriesMap } from '../../store/categories/categories.selector';


import ProductCard from "../product-card/product-card.component";;

const Category = () => {
    const { category } =  useParams();
    // console.log("Person types", category);

    const categoriesMap = useSelector(selectcategoriesMap);
    // console.log("cbeccck", categoriesMap);
    const [products, setProducts]  = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);

    }, [category, categoriesMap]);
    
    const catgeoryTitleStyle = {
    'font-size':'38px',
    'margin-bottom':'25px'
    }

    return (
        <Fragment>
            {/* <h2 style={catgeoryTitleStyle}>category.toLocaleUpperCase()}</h2> */}
            <h2 style={
                {
                    'font-size':'38px',
                    'margin-bottom':'25px'
                }
            }>{category.toLocaleUpperCase()}</h2>
        <CategoryContainer>
            {
            products && products.map((product)=>
            (<ProductCard key={product.id} product={product}></ProductCard>))
            }
        </CategoryContainer>
        </Fragment>
    )

}
export default Category;