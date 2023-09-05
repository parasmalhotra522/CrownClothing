import DirectoryItem from "../directory-item/directory-item.component";
import {CategoriesContainer } from "./categories.styles.jsx";


const Categories = ({categories}) => {
    return (
    <CategoriesContainer>

        {categories.map((category) => {

            return (
                <DirectoryItem key={category.id} category={category} />
            );


        })
        }

    </CategoriesContainer>);
}

export default Categories;

