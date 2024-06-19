import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { FoodData } from '../../interface/foodData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const { mutate, isSuccess} = useFoodDataMutate();

    const submit = () => {
        // Reset error state
        setError("");

        // Check if all fields are filled
        if (!title || !price || !image) {
            setError("Todos os campos devem ser preenchidos.");
            return;
        }

        // Check if price is a number
        if (isNaN(Number(price))) {
            setError("O preço deve ser um número.");
            return;
        }

        const foodData: FoodData = {
            title,
            price,
            image,
            id: 0
        }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess, closeModal])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                {error && <div className="error-message">{error}</div>} {/* Step 3: Display error message */}
                <form className="input-container">
                    <Input label="Nome" value={title} updateValue={setTitle}/>
                    <Input label="Preço" value={price} updateValue={setPrice}/>
                    <Input label="Link URL da imagem" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    Postar
                </button>   
            </div>
        </div>
    );
}