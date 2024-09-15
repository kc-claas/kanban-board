import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const decoded: JwtPayload = jwtDecode(this.getToken())
    return decoded
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded: JwtPayload = jwtDecode(token)
      if (decoded.exp && decoded.exp < (Date.now()/1000)) {
        return true
      }
      else {return false}
    } catch (error) {
      return true
    }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('idToken') || ''
    return token
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('idToken', idToken)
    window.location.assign('/')
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('idToken')
    window.location.assign('/login')
  }
}

export default new AuthService();
