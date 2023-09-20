import "./categories-preview.component.scss";
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from "react-redux";
import { selectcategoriesMap } from '../../store/categories/categories.selector';
import { selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";
import { Fragment } from "react";

const CategoriesPreview = () => {
    const data = useSelector(selectcategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    // const { categoriesMap } = useSelector((state)=>state.categoriesMap);

    // const { products } = products;
    // console.log("check categories preview", data);
    return (
        <Fragment>
            {isLoading ? <Spinner /> :
                (<div className='categories-preview-container'>
                    {
                        Object.keys(data).map((title) => {
                            const products = data[title];

                            return (
                                <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
                            );
                        })
                    }
                </div>)}
        </Fragment>
    )


}



export default CategoriesPreview;