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
	persistLogin: boolean;

	actions: {
		setAuth: (accessToken: string | undefined) => void;
		persistLogin: (value: boolean) => void;
		logout: () => void;
	};
};

export const decodeAccessToken = (accessToken: string): TokenData => jwtDecode<TokenData>(accessToken);

const authStore = create<AuthStore>((set) => ({
	accessToken: undefined,
	user: undefined,
	persistLogin: JSON.parse(localStorage.getItem("persistLogin") || "false"),

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
		persistLogin: (value: boolean = true) => {
			localStorage.setItem("persistLogin", JSON.stringify(value));
			set({ persistLogin: value });
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
const persistLoginSelector = (state: ExtractState<typeof authStore>) => state.persistLogin;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getUserData = () => userDataSelector(authStore.getState());
export const getPersistLogin = () => persistLoginSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
	return useStoreWithEqualityFn(authStore, selector, equalityFn);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useUserData = () => useAuthStore(userDataSelector);
export const usePersistLogin = () => useAuthStore(persistLoginSelector);
export const useActions = () => useAuthStore(actionsSelector);
