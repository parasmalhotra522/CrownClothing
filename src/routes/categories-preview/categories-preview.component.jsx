import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const {textColor} = useSelector((state)=>state.darkModeReducer);
  return (
    <Fragment>
      {/* {console.log("----Checking in the Category Preview Component",isDarkMode, textColor )} */}
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title}
            title={title}
            textColor={textColor}
            products={products}
          />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
