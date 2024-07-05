import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeleteFoodData } from "../hooks/useFoodDataDelete";
import "./card.css";

interface CardProps {
    price: number,
    title: string,
    image: string,
    id: number,
    addToCart: (item: FoodData) => void;
}

export function Card({ price, image, title, id, addToCart }: CardProps) {
    const deleteFoodData = useDeleteFoodData();

    const handleDelete = () => {
        console.log("Deleting item with id:", id);
        deleteFoodData(id);
    };

    const handleAddToCart = () => {
        addToCart({ price, image, title, id });
    };

    return(
        <div className="card">
            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={handleDelete} />
            <img src={image} alt={title}/>
            <h2>{title}</h2>
            <p><b>Valor: R$ </b>{price}</p>
            
        </div>
    );
}
