import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
export default function PetBirthdaySelector({
  petBirthday,
  setPetBirthday,
}: {
  petBirthday: string;
  setPetBirthday: Dispatch<SetStateAction<string>>;
}) {
  const [birthYear, setBirthyear] = useState(
    parseInt(petBirthday?.split('-')[0])
  );
  const [birthMonth, setBirthmonth] = useState(
    parseInt(petBirthday?.split('-')[1])
  );
  const [birthDay, setBirthDay] = useState(
    parseInt(petBirthday?.split('-')[2])
  );

  useEffect(() => {
    setPetBirthday(`${birthYear}-${birthMonth}-${birthDay}`);
  }, [birthYear, birthMonth, birthDay]);

  return (
    <div>
      <YearPicker
        defaultValue={'연도'}
        start={1990} // default is 1900
        reverse // default is ASCENDING
        required={true} // default is false
        value={birthYear} // mandatory
        onChange={(year: number) => {
          // mandatory
          setBirthyear(year);
        }}
        id={'year'}
        name={'year'}
        classes={'yearSelect'}
        optionClasses={'yearOption'}
      />
      <MonthPicker
        defaultValue={'월'}
        numeric // to get months as numbers
        year={birthYear} // mandatory
        required={true} // default is false
        value={birthMonth} // mandatory
        onChange={(month: number) => {
          // mandatory
          setBirthmonth(month);
        }}
        id={'month'}
        name={'month'}
        classes={'monthSelect'}
        optionClasses={'monthOption'}
      />
      <DayPicker
        defaultValue={'일'}
        year={birthYear} // mandatory
        month={birthMonth} // mandatory
        required={false} // default is false
        value={birthDay} // mandatory
        onChange={(day: number) => {
          // mandatory
          setBirthDay(day);
        }}
        id={'day'}
        name={'day'}
        classes={'daySelect'}
        optionClasses={'dayOption'}
      />
    </div>
  );
}
