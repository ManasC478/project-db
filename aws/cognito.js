import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminInitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import { createSecretHash } from "./util";

const server = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});

// create new user in user pool
const createUser = async ({ _id, username, email, password }) => {
  const command = new AdminCreateUserCommand({
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    Username: username,
    DesiredDeliveryMediums: ["EMAIL"],
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: "given_name",
        Value: username,
      },
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "custom:_id",
        Value: _id,
      },
    ],
  });

  return await server.send(command);
};

const authenticateUser = async (authFlow, username, authParams) => {
  const command = new AdminInitiateAuthCommand({
    AuthFlow: authFlow,
    ClientId: process.env.AWS_CLIENT_ID,
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    AuthParameters: {
      ...authParams,
      SECRET_HASH: createSecretHash(username),
    },
  });

  return await server.send(command);
};

// change user password
const changeUserPassword = async ({ username, password }) => {
  const command = new AdminSetUserPasswordCommand({
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    Username: username,
    Password: password,
    Permanent: true,
  });

  return await server.send(command);
};

const verifyAuthToken = async (tokenUse, token) => {
  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      tokenUse,
      clientId: process.env.AWS_CLIENT_ID,
    });

    return await verifier.verify(token);
  } catch (error) {
    console.log("/aws/cognito/verifyAuthToken----------");
    return null;
  }
};

export default {
  createUser,
  authenticateUser,
  changeUserPassword,
  verifyAuthToken,
};
