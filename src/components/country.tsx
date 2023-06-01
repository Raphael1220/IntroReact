import React, { useState, useEffect } from "react";
import Validation from './validation';

interface Country {
  name: {
    common: string;
  };
}

function Country() {
  const url = "https://restcountries.com/v3.1/all";
  const [data, setData] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("0");
  const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState<boolean>(false);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedCountry !== "0") {
      setShowEmailInput(true);
      setSubmitButtonClicked(true);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = () => {
    console.log("Adresse e-mail :", email);
    setSelectedCountry("0");
    setShowEmailInput(false);
    setEmail("");
    setFormSubmitted(true);
  };

  return (
    <div className="country">
      <h1>Choisir un pays</h1>
      <div className="select">
        <select name="country" id="country-select" onChange={handleSelectChange}>
          <option value="0">Veuillez choisir un pays</option>
          {data.map((country: Country, index: number) => (
            <option key={index} value={index + 1}>
              {country.name?.common}
            </option>
          ))}
        </select>
      </div>
      {showEmailInput && (
        <div className="email">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      )}
      <input
        type="submit"
        value={formSubmitted ? "Validé" : submitButtonClicked ? "Envoyé" : "Submit"}
        disabled={selectedCountry === "0" || formSubmitted}
        onClick={formSubmitted ? undefined : submitButtonClicked ? handleEmailSubmit : handleSubmit}
      />
      {formSubmitted && (
        <Validation />
      )}
    </div>
  );
}

export default Country;