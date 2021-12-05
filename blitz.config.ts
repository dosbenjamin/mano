import { SessionData } from "app/authentication/types"
import { BlitzConfig, sessionMiddleware, SessionModel, simpleRolesIsAuthorized } from "blitz"
import db from "db"
import { gql } from "graphql-request"

const normalizeSession = (session: SessionModel) => {
  if (!session) return null
  const { user, expiresAt, ...rest } = session
  return {
    ...rest,
    userId: user.id,
    expiresAt: new Date(expiresAt!),
  }
}

const config: BlitzConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.woff/,
      use: [
        {
          loader: "url-loader",
        },
      ],
    })

    return config
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: "mano",
      isAuthorized: simpleRolesIsAuthorized,
      getSession: async (handle) => {
        const { findSessionByHandle: session } = await db.request<{
          findSessionByHandle: SessionData
        }>(
          gql`
            query getSession($handle: String!) {
              findSessionByHandle(handle: $handle) {
                id: _id
                publicData
                privateData
                antiCSRFToken
                expiresAt
                hashedSessionToken
                handle
                user {
                  id: _id
                }
              }
            }
          `,
          { handle }
        )

        if (!session) return null

        const { user, expiresAt, ...rest } = session
        return {
          ...rest,
          userId: user.id,
          expiresAt: new Date(expiresAt),
        }
      },
      createSession: async ({ userId, ...sessionInput }) => {
        const { createSession: sessionRes } = await db.request<{
          createSession: SessionModel
        }>(
          gql`
            mutation CreateSession($data: SessionInput!) {
              createSession(data: $data) {
                id: _id
                publicData
                privateData
                antiCSRFToken
                expiresAt
                hashedSessionToken
                handle
                user {
                  id: _id
                }
              }
            }
          `,
          {
            data: {
              ...sessionInput,
              expiresAt: sessionInput.expiresAt?.toISOString(),
              user: {
                connect: userId,
              },
            },
          }
        )

        return normalizeSession(sessionRes) as SessionModel
      },
      updateSession: async (sessionHandle, { userId, handle, ...sessionInput }) => {
        const { findSessionByHandle: existingSession } = await db.request<{
          findSessionByHandle: SessionData
        }>(
          gql`
            query getSession($handle: String!) {
              findSessionByHandle(handle: $handle) {
                id: _id
              }
            }
          `,
          { handle: sessionHandle }
        )

        const { updateSession: sessionRes } = await db.request<{
          updateSession: SessionModel
        }>(
          gql`
            mutation UpdateSession($data: SessionInput!) {
              updateSession(data: $data) {
                id: _id
                publicData
                privateData
                antiCSRFToken
                expiresAt
                hashedSessionToken
                handle
                user {
                  id: _id
                }
              }
            }
          `,
          {
            data: {
              ...sessionInput,
              id: existingSession.id,
              expiresAt: sessionInput.expiresAt?.toISOString(),
            },
          }
        )

        return normalizeSession(sessionRes) as SessionModel
      },
      deleteSession: async (handle) => {
        const { findSessionByHandle: existingSession } = await db.request<{
          findSessionByHandle: SessionData
        }>(
          gql`
            query getSession($handle: String!) {
              findSessionByHandle(handle: $handle) {
                id: _id
              }
            }
          `,
          { handle }
        )

        const { deleteSession: sessionRes } = await db.request<{
          deleteSession: SessionModel
        }>(
          gql`
            mutation DeleteSession($id: ID!) {
              deleteSession(id: $id) {
                id: _id
                handle
              }
            }
          `,
          {
            id: existingSession.id,
          }
        )

        return normalizeSession(sessionRes) as SessionModel
      },
    }),
  ],
}
module.exports = config
