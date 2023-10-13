import { Range } from 'react-date-range';
import { create, createStore } from 'zustand';

interface AnalyticsDashboardState {
	range: Range;
}

const log = (config: any) => (set: (...args: any[]) => any, get: any, api: any) =>
	config(
		(...args: any) => {
			console.log('  applying', args);
			set(...args);
			console.log('  new state', get());
		},
		get,
		api
	);

interface AnalyticsDashboardActions {
	setDateRange: (range: Range) => void;
	reset: () => void;
}

const defaultDate = new Date();
defaultDate.setDate(new Date().getDay() - 7);

const INITIAL_STATE: AnalyticsDashboardState = {
	range: {
		startDate: defaultDate,
		endDate: new Date(),
	},
};

const useAnalyicsDashboardStore = create<AnalyticsDashboardState & AnalyticsDashboardActions>(
	log((set: (state: any) => AnalyticsDashboardState, get: any) => ({
		range: INITIAL_STATE.range,
		setDateRange: (range: Range) => set((state: any) => ({ ...state, range })),
		reset: () => set(INITIAL_STATE),
	}))
);

export default useAnalyicsDashboardStore;
