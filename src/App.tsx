import { nanoid } from "nanoid";
import React, { useState } from "react";
import "./App.css";
import Input from "./componets/Input";
interface Data {
  id: string;
  fname: string;
  lname: string;
  email: string;
}
export default function App() {
  const [id, setId] = useState("");
  const [user, setUser] = useState({
    id: "",
    fname: "",
    lname: "",
    email: "",
  });
  const [data, setData] = useState<Data[]>([]);
  const [update1, setUpdate] = useState(false);

  const update = (value: any) => {
    setUser(value);
    setId(value.id);
    data.map((val) =>
      val.id === value.id ? console.log("same", val.fname) : val
    );

    setUpdate(true);
  };
  const del = (id: string) => {
    let index = data.findIndex((val) => val.id == id);
    let newData = data.filter((val) => val.id !== id);
    setData(newData);
    setUpdate(false);
  };
  const name = (e: any) => {
    setUser((prev) => ({
      ...prev,
      fname: e.target.value,
    }));
  };
  const email = (e: any) => {
    setUser((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  const lname = (e: any) => {
    setUser((prev) => ({
      ...prev,
      lname: e.target.value,
    }));
  };
  const submit = (e: any) => {
    e.preventDefault();
    console.log(e);
    if (!update1) {
      setData((prev: any) => [
        ...prev,
        {
          ...user,
          id: nanoid(),
        },
      ]);
    } else {
      setData((prev) =>
        prev.map((val) => (val.id == id ? { ...val, fname: user.fname } : val))
      );
    }
    //arr.push(user);
    console.log(data);
    let empty = {
      id: "",
      fname: "",
      lname: "",
      email: "",
    };
    setUpdate(false);
    //setUser(empty);
  };
  return (
    <div>
      {update1 ? (
        <>
          <h1>update</h1>
          <form onSubmit={submit}>
            <Input value={user.fname} onChange={name} label={"fname"} />
            <Input value={user.lname} onChange={lname} label={"lname"} />
            <Input value={user.email} onChange={email} label={"email"} />
            <button type="submit">Update</button>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={submit}>
            <Input value={user.fname} onChange={name} label={"fname"} />
            <Input value={user.lname} onChange={lname} label={"lname"} />
            <Input value={user.email} onChange={email} label={"email"} />
            <button type="submit">Click</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((val: any, index: any) => (
                  <tr key={index}>
                    <td>{val.id}</td>
                    <td>{val.fname}</td>
                    <td>{val.lname}</td>
                    <td>{val.email}</td>

                    <td>
                      <button onClick={() => update(val)}>update</button>
                      <button onClick={() => del(val.id)}>delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
