import { useAppDispatch } from "@/store/configureStore";
import { updateShots } from "@/store/slices/shotsSlice";

export const useDribbleShots = () => {
	const dispatch = useAppDispatch();
	const fetchDribbbleShots = async (page = 1, perPage = 16) => {
		const response = await fetch(
			`https://api.dribbble.com/v2/user/shots?access_token=${process.env.NEXT_PUBLIC_DRIBBLE_API_KEY}&page=${page}&per_page=${perPage}`
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch shots: ${response.statusText}`);
		}

		const shots = await response.json();
		dispatch(updateShots(shots));
		return shots;
	};

	return { fetchDribbbleShots };
};
