import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";

type TokenData = {
	user: {
		id: string;
	};
	iat: number;
	exp: number;
};

type User = {
	id: string;
};

type AuthStore = {
	accessToken: string | undefined;
	user: User | undefined;

	actions: {
		setAuth: (accessToken: string | undefined) => void;
		logout: () => void;
	};
};

export const decodeAccessToken = (accessToken: string): TokenData => jwtDecode<TokenData>(accessToken);

const authStore = create<AuthStore>((set) => ({
	accessToken: undefined,
	user: undefined,

	actions: {
		setAuth: (accessToken: string | undefined) => {
			const user = (() => {
				try {
					return accessToken ? decodeAccessToken(accessToken).user : undefined;
				} catch (error) {
					console.error(error);
					return undefined;
				}
			})();
			set({
				accessToken,
				user,
			});
		},

		logout: () =>
			set({
				accessToken: undefined,
				user: undefined,
			}),
	},
}));

export type ExtractState<S> = S extends {
	getState: () => infer T;
}
	? T
	: never;

type Params<U> = Parameters<typeof useStoreWithEqualityFn<typeof authStore, U>>;

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
const userDataSelector = (state: ExtractState<typeof authStore>) => state.user;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getUserData = () => userDataSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
	return useStoreWithEqualityFn(authStore, selector, equalityFn);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useUserData = () => useAuthStore(userDataSelector);
export const useActions = () => useAuthStore(actionsSelector);
