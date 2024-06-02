export default function Footer() {
  return (
    <div className='text-center text-sm py-6'>
      <p className='mb-3'>&copy; 2024 All Rights Reserved.</p>

      <div className='flex items-center gap-x-3 justify-center'>
        <a
          href='#'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Terms of Services
        </a>
        <a
          href='#'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
