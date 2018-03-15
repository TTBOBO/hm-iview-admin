import * as type from '../constant/type'

export const infoMutations = {
	[type.FETCH_USER_SUC](state) {
		state.data = true;
   	},
}
