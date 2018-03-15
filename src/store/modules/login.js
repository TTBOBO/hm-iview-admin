import { loginAction} from '../actions/login'

import { loginMutations } from '../mutations/login'

const login = {
	state: {
		data: {
            success: false,
            logMsg: ''
        },
        userinfo: {
            face: '',
            shouji: ''
        },
        userData:{
        	username: 'test',
        	password: 'tab822520'
        },
        regMsg:false,
        changePwd:{
            status:true,
            msg:''
        }
        
	},
	actions:loginAction,
	mutations:loginMutations
}

export default login
