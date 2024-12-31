import { useAppDispatch } from "@/store/configureStore";
import { setShots, appendShots } from "@/store/slices/shotsSlice";

export const useDribbleShots = () => {
  const dispatch = useAppDispatch();

  // Fetch all 200 shots at once
  const fetchDribbbleShots = async () => {
    const response = await fetch(
      `https://api.dribbble.com/v2/user/shots?access_token=${process.env.NEXT_PUBLIC_DRIBBLE_API_KEY}&page=1&per_page=200`
    );

    if (!response.ok) {
      console.log(`Failed to fetch shots: ${response.statusText}`);
      return [];
    }

    const shots = await response.json();
    dispatch(setShots(shots)); // Dispatch action to store all 200 shots
    return shots;
  };

  return { fetchDribbbleShots };
};
