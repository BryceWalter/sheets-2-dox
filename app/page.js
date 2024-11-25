import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import CredentialsProvider from "next-auth/providers/credentials";

const Home = async () => {
  const session = await getServerSession({
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {},

        async authorize(credentials) {
          const { email, password } = credentials;

          try {
            await connectMongoDB();
            const user = await User.findOne({ email });


            if (!user) {
              return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
              return null;
            }

            return user;
          } catch (error) {
            console.log(error);
          }
          return user;
        },
      })
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/'
    }
  });

  if (session) redirect('/dashboard');
  return (
    <main>
      <LoginForm />
    </main>
  );
}

export default Home;