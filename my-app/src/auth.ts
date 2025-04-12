import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth as ClientAuth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.email && credentials?.password) {
            // Attempt to sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(
              ClientAuth,
              credentials.email as string,
              credentials.password as any,
            );

            const user = userCredential.user;
            // Return user data on successful login
            const userDocRef = doc(db, "users", user.email);
            const userDocSnap = await getDoc(userDocRef);
            let displayName = user.displayName || "UnknownUser"; // احتياطي
            let profileImage = user.photoURL || "https://s.gravatar.com/avatar/0743d216d4ce5aea55b0a45675d313e4?s=64&d=mp"
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              if (userData.firstname) {
                displayName = userData.firstname;
              }
              if (userData.profileimage){
                profileImage = userData.profileimage;
              }
            }
            return {
              id: user.uid,
              email: user.email,
              name: displayName,
              image: profileImage,
            };
          }
        } catch (error) {
          console.error("Error during Firebase sign-in:", error);
          return null; // Return null if authentication fails
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.picture || profile.image || "https://s.gravatar.com/avatar/0743d216d4ce5aea55b0a45675d313e4?s=64&d=mp";

        try {
          if (profile.email) {
            const userRef = doc(db, "users", profile.email);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
              await setDoc(userRef, {
                id: profile.sub,
                email: profile.email,
                name: profile.name,
                profileimage: profile.image,
                emailVerified: null,
              });
            }
          }
        } catch (error) {
          console.error("🔥 Firestore Error:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      try {
        const userRef = doc(db, "users", token.email as string);
        const userSnap = await getDoc(userRef);
    
        if (userSnap.exists()) {
          const userData = userSnap.data();
    
          session.user = {
            id: token.id as any,
            email: token.email as string,
            name: userData.firstname || token.name,
            image: userData.profileimage || token.picture || "https://s.gravatar.com/avatar/0743d216d4ce5aea55b0a45675d313e4?s=64&d=mp",
          };
        } else {
          session.user = {
            id: token.id as any,
            email: token.email as string,
            name: token.name as string,
            image: token.picture as string,
          };
        }
    
        return session;
      } catch (error) {
        console.error("❌ Error fetching user data from Firestore in session:", error);
        return session;
      }
    },    
  },
});
