import Image from 'next/image';
import Button from '@/components/Button';

const InfoPage = ({ imageSrc, children, onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6E6FA] text-purple-600 px-8">
      <div className="nyan-cat"></div>
      <h1 className="text-2xl font-bold mb-4 text-center">
      purr-gnant or fluffy cat facts
      </h1>
      <div className="mb-8 w-full max-w-md border-4">
        <Image
          src={imageSrc}
          width={500}
          height={500}
          alt="Cat"
          className="rounded"
        />
      </div>
      <p className='text-[12px] text-center my-4 max-w-[350px]'>{children}</p>
      <div className="flex items-center justify-center mt-4">
        <Button
          onClick={onContinue}
          variant="primary"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default InfoPage;
