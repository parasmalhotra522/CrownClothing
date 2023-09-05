import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles.jsx";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
    let { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    // don't forget the return statement else the render won't be done
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl}
               
            ></BackgroundImage>
            <Body>

                <h2>{title}</h2>
                <p className="shop-now">Shop Now</p>
            </Body>


        </DirectoryItemContainer>
    );
}
export default DirectoryItem;