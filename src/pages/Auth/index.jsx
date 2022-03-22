import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/client';
import { AUTH_MUTATION } from '../../mutations/authMutations';
import { GOOGLE_CLIENT_ID } from '../../config';
import { setLocalStorage } from '../../utils/localStorage';

function Auth({ setUser }) {
  const [authGoogle, { loading, error }] = useMutation(AUTH_MUTATION);
  const googleResponse = (response) => {
    authGoogle({
      variables: {
        input: {
          accessToken: response.accessToken,
        },
      },
    }).then((res) => {
      setLocalStorage('user', JSON.stringify(res.data.authGoogle));
      setUser(res.data.authGoogle);
    });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="App">
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login to Social media"
        onSuccess={googleResponse}
        onFailure={onFailure}
      />
    </div>
  );
}

export default Auth;
