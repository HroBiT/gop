import React, { useState, useEffect } from 'react';

const App = () => {
  const [Imie, setImie] = useState('');
  const [Nazwisko, setNazwisko] = useState('');
  const [Email, setEmail] = useState('');
  const [Haslo, setHaslo] = useState('');
  const [Phaslo, setPhaslo] = useState('');
  const [Wiek, setWiek] = useState();
  const [Data, setData] = useState(new Date());
  const [Kraj, setKraj] = useState('');
  const [kraje, setKraje] = useState([]);
  const [Plec, setPlec] = useState('');
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchKraje = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryList = data.map((country) => ({
          name: country.name.common, 
          code: country.cca2, 
        }));
        setKraje(countryList);
      } catch (error) {
        console.error('Błąd pobierania krajów:', error);
      }
    };

    fetchKraje();
  }, []);

  const validateForm = (event) => {
    event.preventDefault();
    let isValid = true;
    const data = new Date(Data);
    const TenRok = new Date().getFullYear();
    const rok = data.getFullYear();
    const pelno = TenRok - rok;

    if (Imie.length <= 2) {
      alert('Imię musi mieć więcej niż 2 znaki');
      isValid = false;
    }

    if (Nazwisko.length <= 2) {
      alert('Nazwisko musi mieć więcej niż 2 znaki');
      isValid = false;
    }

    const emailReg = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/;
    if (!emailReg.test(Email)) {
      alert('Niepoprawny email');
      isValid = false;
    }

    const PasReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!PasReg.test(Haslo)) {
      alert('Hasło musi mieć co najmniej 8 znaków, w tym jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny');
      isValid = false;
    } else if (Haslo !== Phaslo) {
      alert('Hasła nie są takie same');
      isValid = false;
    }

    if (Wiek < 18 || Wiek > 99) {
      alert('Wiek jest nieprawidłowy');
      isValid = false;
    }

    if (pelno < 18) {
      alert('Nie masz 18 lat');
      isValid = false;
    }

    if (!check) {
      alert('Musisz zaakceptować regulamin');
      isValid = false;
    }

    if (!Plec) {
      alert('Musisz wybrać płeć');
      isValid = false;
    }

    if (!Kraj) {
      alert('Musisz wybrać kraj');
      isValid = false;
    }

    if (isValid) {
      alert('Formularz jest poprawny');
    }
  };

  return (
    <div className="p-10 h-dvh bg-blue-950 flex justify-center">
      <form className="w-1/2 h-5/6 bg-slate-700 justify-center text-white p-5 rounded-xl" onSubmit={validateForm}>
        <h1 className="justify-center">Formularz</h1>

        <p>Imię:</p>
        <input
          type="text"
          className="border rounded-xl text-black pl-5"
          id="imie"
          value={Imie}
          onChange={(e) => setImie(e.target.value)}
        />

        <p className="mt-5">Nazwisko:</p>
        <input
          type="text"
          className="border rounded-xl text-black pl-5"
          id="nazwisko"
          value={Nazwisko}
          onChange={(e) => setNazwisko(e.target.value)}
        />

        <p className="mt-5">Email:</p>
        <input
          type="text"
          className="border rounded-xl text-black pl-5"
          id="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="mt-5">Hasło:</p>
        <input
          type="password"
          className="border rounded-xl text-black pl-5"
          id="haslo"
          value={Haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />

        <p className="mt-5">Potwierdź hasło:</p>
        <input
          type="password"
          className="border rounded-xl text-black pl-5"
          id="haslo1"
          value={Phaslo}
          onChange={(e) => setPhaslo(e.target.value)}
        />

        <p className="mt-5">Wiek:</p>
        <input
          type="number"
          className="border rounded-xl text-black pl-5"
          id="wiek"
          value={Wiek}
          onChange={(e) => setWiek(e.target.value)}
        />

        <p className="mt-5">Data Urodzenia:</p>
        <input
          type="date"
          className="border rounded-xl mb-10 text-black"
          id="data"
          value={Data}
          onChange={(e) => setData(e.target.value)}
        />

        <p>Kraj:</p>
        <select
          className="border rounded-xl text-black pl-5"
          value={Kraj}
          onChange={(e) => setKraj(e.target.value)}
        >
          <option value="">Wybierz kraj</option>
          {kraje.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <p className="mt-5">Płeć:</p>
        <label>
          <input
            type="radio"
            name="plec"
            value="Mężczyzna"
            checked={Plec === 'Mężczyzna'}
            onChange={(e) => setPlec(e.target.value)}
          /> Mężczyzna
        </label>
        <label className="ml-5">
          <input
            type="radio"
            name="plec"
            value="Kobieta"
            checked={Plec === 'Kobieta'}
            onChange={(e) => setPlec(e.target.value)}
          /> Kobieta
        </label>

        <p className="mt-5">Regulamin:</p>
        <input
          type="checkbox"
          checked={check}
          onChange={(e) => setCheck(e.target.checked)}
        /> Akceptuję regulamin

        <br />
        <p className='mt-5'>Zgody marketingowe</p>
        <input type="checkbox" id="zgoda1" />
        <br />
        <button type="submit" className="mt-5 bg-green-500 text-white p-2 rounded">Zarejestruj sie</button>
      </form>
    </div>
  );
};

export default App;
