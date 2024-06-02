import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function DefaultLayout({ children }) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Navbar />
      <main className='container flex-1 flex-grow'>{children}</main>
      <Footer />
    </div>
  );
}
