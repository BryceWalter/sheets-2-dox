"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are necessary');
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError('User already exists');
        return;
      }

      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password,
        })
      })

      if (res.ok) {
        const form = e.target;
        router.push('/')
        setName('')
        setEmail('')
        setPassword('')
        form.reset();
      }
    } catch (error) {

    }
  }


  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} action="submit" className="flex flex-col gap-3">
          <input type="text" placeholder="Full Name" onChange={e => setName(e.target.value)} />
          <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Login</button>

          {error &&
            <div className="bg-red-500 text-white py-1 px-3 rounded-md mt-2 text-sm">{error}</div>
          }


          <Link className="text-sm mt-3 text-right" href={'/'}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}