import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const deleteFoodData = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/food/${id}`);
};
export default deleteFoodData;

export function useDeleteFoodData() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteFoodData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food-data'] });
        },
        onError: (error) => {
            console.error("Failed to delete food item:", error);
        }
    });

    return mutation.mutate;
}
