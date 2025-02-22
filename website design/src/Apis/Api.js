import axios from "axios";

const fetchData = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/recipes?limit=12&skip=6');
        return response.data.recipes; // ✅ Return the "recipes" array
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; // ✅ Return an empty array in case of an error
    }
}

export default fetchData;
