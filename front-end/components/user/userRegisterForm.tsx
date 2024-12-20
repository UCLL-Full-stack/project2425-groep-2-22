import { useState } from "react";
import classNames from "classnames";
import UserService from "../../services/UserService";
import { useRouter } from "next/router";
import { StatusMessage } from "../../types";

const UserRegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(10);
  const [weight, setWeight] = useState(10);
  const [height, setHeight] = useState(10);
  const [gender, setGender] = useState("");

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [weightError, setWeightError] = useState<string | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setAgeError(null);
    setWeightError(null);
    setHeightError(null);
    setGenderError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!username || username.trim() === "") {
      setUsernameError("Username is required");
      result = false;
    }

    if (!password || password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }

    if (!firstName || firstName.trim() === "") {
      setFirstNameError("First Name is required");
      result = false;
    }

    if (!lastName || lastName.trim() === "") {
      setLastNameError("Last Name is required");
      result = false;
    }

    if (age <= 0 || isNaN(age)) {
      setAgeError("Age must be a positive number");
      result = false;
    }

    if (weight <= 0 || isNaN(weight)) {
      setWeightError("Weight must be a positive number");
      result = false;
    }

    if (height <= 0 || isNaN(height)) {
      setHeightError("Height must be a positive number");
      result = false;
    }

    if (!gender || gender.trim() === "") {
      setGenderError("Gender is required");
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

    const user = {
      username,
      password,
      firstName,
      lastName,
      age,
      weight,
      height,
      gender,
    };

    const response = await UserService.registerUser(user);
    if (response.status === 200) {
      setStatusMessages([
        {
          message: "Registration successful",
          type: "success",
        },
      ]);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <>
      <h3 className="px-0">Register</h3>
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="usernameInput" className="block mb-2 text-sm font-medium">
            Username:
          </label>
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {usernameError && <div className="text-red-800">{usernameError}</div>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstNameInput" className="block mb-2 text-sm font-medium">
              First Name:
            </label>
            <input
              id="firstNameInput"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {firstNameError && <div className="text-red-800">{firstNameError}</div>}
          </div>

          <div>
            <label htmlFor="lastNameInput" className="block mb-2 text-sm font-medium">
              Last Name:
            </label>
            <input
              id="lastNameInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {lastNameError && <div className="text-red-800">{lastNameError}</div>}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="ageInput" className="block mb-2 text-sm font-medium">
              Age:
            </label>
            <input
              id="ageInput"
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {ageError && <div className="text-red-800">{ageError}</div>}
          </div>

          <div>
            <label htmlFor="weightInput" className="block mb-2 text-sm font-medium">
              Weight:
            </label>
            <input
              id="weightInput"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {weightError && <div className="text-red-800">{weightError}</div>}
          </div>

          <div>
            <label htmlFor="heightInput" className="block mb-2 text-sm font-medium">
              Height:
            </label>
            <input
              id="heightInput"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {heightError && <div className="text-red-800">{heightError}</div>}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Gender:</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
                className="mr-2"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="Other"
                checked={gender === "Other"}
                onChange={() => setGender("Other")}
                className="mr-2"
              />
              Other
            </label>
          </div>
          {genderError && <div className="text-red-800">{genderError}</div>}
        </div>
        <div>
          <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
            Password:
          </label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {passwordError && <div className="text-red-800">{passwordError}</div>}
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-full focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default UserRegisterForm;
