
import http from '@/common/http';
export default class Token{
	 async getTokens(data) {
	    const tokens = await 
	    if (tokens) {
	      setTokensToStorage(tokens.access_token, tokens.refresh_token)
	      return {
	        accessToken: tokens.access_token,
	        refreshToken: tokens.refresh_token,
	      }
	    }
	    return null
	  }
}