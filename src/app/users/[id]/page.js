"use client";
import {
    useState,
    useEffect,
} from "react";
import { useParams } from "next/navigation";

import Link from "next/link";

export default function Post() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function fetchPosts() {
            let res = await
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            let data = await res.json();
            console.log(data)
            setUser(data);
        }
        fetchPosts();
    }, []);

    
    if (!user) {
        return ( 
          <div className="grid grid-rows-[20px_1fr_20px] items-center 
              justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-
              [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 itemscenter sm:items-start">
              <h1>Loading....</h1>
            </main>
          </div>
        );
    }
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center 
            justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-
            [family-name:var(--font-geist-sans)]">
    
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div>
                    <table className="table-auto w-full border-collapse border ">
                        <tbody>
                            <tr className="border">
                                <td className="px-4 py-2 font-semibold">Id</td>
                                <td className="px-4 py-2">{user.id}</td>
                            </tr>
                            <tr className="border">
                                <td className="px-4 py-2 font-semibold">Nama</td>
                                <td className="px-4 py-2">{user.name}</td>
                            </tr>
                            <tr className="border">
                                <td className="px-4 py-2 font-semibold">Email</td>
                                <td className="px-4 py-2">{user.email}</td>
                            </tr>
                            <tr className="border">
                                <td className="px-4 py-2 font-semibold">Username</td>
                                <td className="px-4 py-2">{user.username}</td>
                            </tr>
                            <tr className="border">
                                <td className="px-4 py-2 font-semibold">Telepon</td>
                                <td className="px-4 py-2">{user.phone}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <Link href="/">
                    <button className="border px-4 py-2 shadow rounded-md bg-indigo-600 text-white">
                        Kembali
                    </button>
                </Link>
            </main>
        </div>
    );
}