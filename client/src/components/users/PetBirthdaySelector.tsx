import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
export default function PetBirthdaySelector({
  petBirthday,
  setPetBirthday,
}: {
  petBirthday: string;
  setPetBirthday: Dispatch<SetStateAction<string>>;
}) {
  const [birthYear, setBirthyear] = useState(petBirthday?.split('-')[0]);
  const [birthMonth, setBirthmonth] = useState(
    `${parseInt(petBirthday?.split('-')[1]) - 1}`
  );
  const [birthDay, setBirthDay] = useState(petBirthday?.split('-')[2]);

  useEffect(() => {
    if (parseInt(birthMonth) + 1 < 10 && parseInt(birthDay) >= 10) {
      setPetBirthday(`${birthYear}-0${parseInt(birthMonth) + 1}-${birthDay}`);
    } else if (parseInt(birthMonth) + 1 < 10 && parseInt(birthDay) < 10) {
      setPetBirthday(`${birthYear}-0${parseInt(birthMonth) + 1}-0${birthDay}`);
    } else if (parseInt(birthMonth) + 1 >= 10 && parseInt(birthDay) < 10) {
      setPetBirthday(`${birthYear}-${parseInt(birthMonth) + 1}-0${birthDay}`);
    } else {
      setPetBirthday(`${birthYear}-${parseInt(birthMonth) + 1}-${birthDay}`);
    }
  }, [birthYear, birthMonth, birthDay]);

  return (
    <>
      <YearPicker
        defaultValue={'연도'}
        start={1990} // default is 1900
        reverse // default is ASCENDING
        required={true} // default is false
        value={parseInt(birthYear)} // mandatory
        onChange={(year: number) => {
          // mandatory
          setBirthyear(year.toString());
        }}
        id={'year'}
        name={'year'}
        classes={'yearSelect'}
        optionClasses={'yearOption'}
      />
      <MonthPicker
        defaultValue={'월'}
        numeric // to get months as numbers
        year={parseInt(birthYear)} // mandatory
        required={true} // default is false
        value={parseInt(birthMonth)} // mandatory
        onChange={(month: number) => {
          // mandatory
          setBirthmonth(month.toString());
        }}
        id={'month'}
        name={'month'}
        classes={'monthSelect'}
        optionClasses={'monthOption'}
      />
      <DayPicker
        defaultValue={'일'}
        year={parseInt(birthYear)} // mandatory
        month={parseInt(birthMonth)} // mandatory
        required={false} // default is false
        value={parseInt(birthDay)} // mandatory
        onChange={(day: number) => {
          // mandatory
          setBirthDay(day.toString());
        }}
        id={'day'}
        name={'day'}
        classes={'daySelect'}
        optionClasses={'dayOption'}
      />
    </>
  );
}
