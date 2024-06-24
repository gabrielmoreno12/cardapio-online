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

function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [buttonText, setButtonText] = useState("Postar"); // Estado para controlar o texto do botão
    const { mutate, isSuccess } = useFoodDataMutate();

    const submit = () => {
        setError("");
        if (!title || !price || !image) {
            setError("Todos os campos devem ser preenchidos.");
            return;
        }

        if (isNaN(Number(price))) {
            setError("O preço deve ser um número.");
            return;
        }

        setButtonText("Postando..."); // Altera o texto do botão para "Postando..."
        const foodData: FoodData = { title, price, image, id: 0 }
        mutate(foodData);
    }

    useEffect(() => {
        if (isSuccess) {
            // Define um timeout para atrasar a ação
            const timeoutId = setTimeout(() => {
                closeModal();
                setButtonText("Postar"); // Reverte o texto do botão para "Postar" após 1,5 segundos
            }, 1000); // 1500 milissegundos = 1,5 segundos
    
            // Limpa o timeout se o componente for desmontado antes de 1,5 segundos
            return () => clearTimeout(timeoutId);
        }
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <div className="modal-header">
                    <h2>Cadastre um novo item no cardápio</h2>
                    <button className="btn-close" onClick={closeModal}>x</button>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form className="input-container">
                    <Input label="Nome" value={title} updateValue={setTitle} />
                    <Input label="Preço" value={price} updateValue={setPrice} />
                    <Input label="Link URL da imagem" value={image} updateValue={setImage} />
                </form>
                <div className="button-container">
                    <button onClick={submit} className="btn-secondary">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export { CreateModal };