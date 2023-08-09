import { useNavigate } from 'react-router-dom';

import {DirectoryItemContainer,BackgroundImage,Body} from './directory-item.styles.jsx'

const DirectoryItem = ({category})=>{
    const {title,imageUrl} = category;
    const navigate = useNavigate();

    const navigateHandler = ()=> navigate(`shop/${title.toLowerCase()}`);

    return (
        <DirectoryItemContainer onClick={navigateHandler}>
          <BackgroundImage imageUrl = {imageUrl}/>  
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>

      </DirectoryItemContainer> 
    )
}

export default DirectoryItem;