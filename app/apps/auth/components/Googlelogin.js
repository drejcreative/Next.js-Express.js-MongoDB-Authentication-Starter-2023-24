import GoogleLogin from 'react-google-login';
import { signInGoogleService } from '../../../services/authServices';

const GoogleLoginComponent = ({ googleSucesfullLogin, pushErrorMessage }) => {
  const responseGoogle = async (response) => {
    const tokenId = response.tokenId;
    console.log('tokenId', tokenId);

    try {
      const googleLoginToken = await signInGoogleService({ tokenId });
      googleSucesfullLogin(googleLoginToken);
    } catch (error) {
      pushErrorMessage(error);
    }
  }

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      theme='dark'
    />
  )
}

export default GoogleLoginComponent;