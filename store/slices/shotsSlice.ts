import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Shot {
	animated?: boolean;
	attachment?: string[];
	description?: string;
	height?: number;
	html_url?: string;
	id?: number;
	images?: {
		four_x: string;
		hidpi: string;
		normal: string;
		one_x: string;
		teaser: string;
		two_x: string;
	};
	low_profile?: boolean;
	projects?: [];
	published_at?: string;
	tags?: string[];
	title?: string;
	updated_at?: string;
	video?: string;
	width?: number;
}

const initialState: Shot[] = []; // Initialize as an empty array of shots

const shotsSlice = createSlice({
	name: "shots",
	initialState,
	reducers: {
		addShot: (state, action: PayloadAction<Shot>) => {
			state.push(action.payload); // Add a single shot to the array
		},
		updateShots: (state, action: PayloadAction<Shot[]>) => {
			return action.payload; // Replace the state with a new array of shots
		},
		resetShots: () => initialState, // Reset to the initial empty array
	},
});

export default shotsSlice.reducer;
export const { addShot, updateShots, resetShots } = shotsSlice.actions;
