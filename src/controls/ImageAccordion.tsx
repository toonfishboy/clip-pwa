import { FC, PropsWithChildren } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/all';

interface ImageAccordionProps extends PropsWithChildren {
  imgSrc: string;
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ImageAccordion: FC<ImageAccordionProps> = ({
  isOpen,
  setIsOpen,
  children,
  imgSrc,
  title,
  description,
}) => {
  return (
    <div className={'mx-2 flex h-full flex-col overflow-hidden rounded-xl border border-black  shadow-xl'}>
      <header className={'flex cursor-pointer'} onClick={() => setIsOpen(!isOpen)}>
        <img src={imgSrc} alt={title} className={'h-60 w-60 rounded-xl'} />
        <div className={'ml-8 mt-8 flex w-full'}>
          <div className={'flex w-full flex-col'}>
            <div className={'w-full border-b border-black text-xl'}>{title}</div>
            <p>{description}</p>
          </div>
          <div className={'px-2'}>
            {isOpen ? <FaAngleUp className={'h-6 w-6'} /> : <FaAngleDown className={'h-6 w-6'} />}
          </div>
        </div>
      </header>
      {isOpen && <section className="m-2 flex flex-col gap-2">{children}</section>}
    </div>
  );
};

export default ImageAccordion;
