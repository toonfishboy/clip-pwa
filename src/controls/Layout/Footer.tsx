import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { emailState } from '../../recoil/atoms';
import Button from './Button';

interface FooterProps {
  resetValues: () => void;
  getEmail: () => string;
  subject: string;
}

const Footer: FC<FooterProps> = ({ resetValues, getEmail, subject }) => {
  const email = useRecoilValue(emailState);
  return (
    <div className={'flex gap-2'}>
      <Button onClick={resetValues}>Zurücksetzen</Button>
      <a
        className="rounded-md bg-gradient-to-tr from-rose-500 to-rose-700 py-2 px-3 text-lg text-white shadow-md"
        href={`mailto:${email}?subject=${subject}&body=${getEmail()}`}
      >
        Ergebnis als Mail
      </a>
    </div>
  );
};

export default Footer;
