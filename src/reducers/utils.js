import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export function decodeUser() {
  const jwt = Cookies.get('jwt');
  const parsedUser = jwt && jwtDecode(jwt);
  return parsedUser || null;
}
