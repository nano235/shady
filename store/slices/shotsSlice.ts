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

interface ShotsState {
  shots: Shot[]; // All shots
  displayedShots: Shot[]; // Shots to display based on scroll
  hasMore: boolean; // If there are more shots to load
}

const initialState: ShotsState = {
  shots: [], // Initialize with no shots
  displayedShots: [], // Shots to display initially empty
  hasMore: true, // Initially, there are more shots to load
};

const shotsSlice = createSlice({
  name: "shots",
  initialState,
  reducers: {
    setShots: (state, action: PayloadAction<Shot[]>) => {
      state.shots = action.payload; // Store all shots
      state.displayedShots = action.payload.slice(0, 20); // Display the first 20 shots
    },
    appendShots: (state) => {
      const currentDisplayedShots = state.displayedShots;
      const nextBatch = state.shots.slice(
        currentDisplayedShots.length,
        currentDisplayedShots.length + 20
      );
      state.displayedShots = [...currentDisplayedShots, ...nextBatch]; // Append 20 more shots

      // If all shots are displayed, set hasMore to false
      if (state.displayedShots.length >= state.shots.length) {
        state.hasMore = false;
      }
    },
    resetShots: () => initialState,
  },
});

export default shotsSlice.reducer;
export const { setShots, appendShots, resetShots } = shotsSlice.actions;
