import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import { useState } from 'react';


WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '336268932685-f32ielccpm9i0dldo45lareus6p429iu.apps.googleusercontent.com',
  });
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setAuthToken(authentication?.accessToken);
    }
  }, [response]);

  return (
    <>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
          console.log(response);
        } }
      />
      <Button
          title="Logout"
          onPress={async () => {
              const tokenToRevoke: AuthSession.RevokeTokenRequestConfig = {
                token: authToken ?? ''
              };
              const discoveryDocument: AuthSession.DiscoveryDocument = {};
              await AuthSession.revokeAsync(tokenToRevoke, discoveryDocument);
          } } 
      />
    </>
  );
}
