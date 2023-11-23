// Import necessary modules and types
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest, AuthRequestPromptOptions } from "expo-auth-session";
import { Text, View, TouchableOpacity } from "react-native";
import { auth } from "../../firebase";
import { createTokenWithCode } from "../utils/createGitHubToken"; // Make sure to import this correctly

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/95b2ac9d3f80a5af6c72`,
};

export default function GithubLogin(): JSX.Element {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '95b2ac9d3f80a5af6c72',
      scopes: ["identity", "user:email"],
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  React.useEffect(() => {
    handleResponse();
  }, [response]);

  async function handleResponse() {
    if (response?.type === "success") {
      const { code } = response.params;
      const { token_type, scope, access_token } = await createTokenWithCode(code);

      if (!access_token) return;

      const credential = GithubAuthProvider.credential(access_token);
      const data = await signInWithCredential(auth, credential);

      console.log("credential: ", credential);
      console.log("data: ", JSON.stringify(data, null, 2));
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          // Use a plain object for windowFeatures
          const windowFeatures: AuthRequestPromptOptions['windowFeatures'] = {
            useWebKit: true,
          };
          promptAsync({ windowName: "Freelance Island", windowFeatures });
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "500" }}>
          Sign In with Github
        </Text>
      </TouchableOpacity>
    </View>
  );
}
