"use client";
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
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Daftar Pengguna</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari pengguna..."
          />
          <button type="submit">Cari</button>
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
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}