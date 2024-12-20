import { StatusMessage } from "../../types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserService from "../../services/UserService";

const UserLoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name && name.trim() === "") {
      setNameError('Username is required');
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError('Password is required');
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { username: name, password: password };
    try {
      const response = await UserService.loginUser(user);

      if (response.status === 200) {
        setStatusMessages([
          {
            message: 'Login was successful',
            type: "success",
          },
        ]);

        const userData = await response.json();
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            id: userData.id,
            token: userData.token,
            username: userData.username,
            role: userData.role,
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            weight: userData.weight,
            height: userData.height,
            gender: userData.gender,
          })
        );

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setStatusMessages([
          {
            message: "Invalid username or password.",
            type: "error",
          },
        ]);
      }
    } catch (error) {
      setStatusMessages([
        {
          message: "An error occurred during login.",
          type: "error",
        },
      ]);
    }
  };

  return (
    <>
      <h3 className="px-0">Login</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          Username:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          {nameError && <div className="text-red-800 ">{nameError}</div>}
        </div>
        <div className="mt-2">
          <div>
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium"
            >
              Password:
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {passwordError && <div className=" text-red-800">{passwordError}</div>}
          </div>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
      </form>
      <section className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">User Table</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Username</th>
              <th className="px-4 py-2 border border-gray-300">Password</th>
              <th className="px-4 py-2 border border-gray-300">Role</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">user1</td>
              <td className="px-4 py-2 border border-gray-300">admin123</td>
              <td className="px-4 py-2 border border-gray-300">admin</td>

            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">user2</td>
              <td className="px-4 py-2 border border-gray-300">trainer123</td>
              <td className="px-4 py-2 border border-gray-300">trainer</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">user3</td>
              <td className="px-4 py-2 border border-gray-300">member123</td>
              <td className="px-4 py-2 border border-gray-300">member</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default UserLoginForm;
