"use client";
import Link from "next/link";
import {
    useState,
    useEffect
} from "react";

export default function Posts() {
    const [users, setUsers] = useState(null);
    const [query, setQuery] = useState("");
    useEffect(() => {
        async function fetchPosts() {
            let res = await
            fetch("https://jsonplaceholder.typicode.com/users");
            let data = await res.json();
            setUsers(data);
        }
        fetchPosts();
    }, []);
    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/users?q=${query}`
        );
        const data = await res.json();
        setUsers(data);
    };
    if (!users) {
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
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <h1 className="font-bold text-2xl">Daftar Pengguna</h1>
          <form onSubmit={handleSearch}>
            <input
              className="border shadow px-4 py-2 rouded-md"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari pengguna..."
            />
            <button 
              type="submit"
              className="border px-4 py-2 ml-4 shadow bg-indigo-600 text-white rounded-md"
              >Cari</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td>
                    <Link className="border px-4 py-2 shadow rounded-md bg-indigo-600 text-white" href={`/users/${user.id}`}>
                      <button>
                        Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
  );
}