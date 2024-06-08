import { CircleUser, Loader2, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const res = await fetch('http://localhost:3001/dashboard/@me', {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Not authenticated');
        }

        const user = await res.json();

        setUser(user);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    })();
  }, []);

  async function handleLogout() {
    try {
      const res = await fetch('http://localhost:3001/auth/signout', {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to logout');
      }

      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className='z-20 mb-5'>
        <div className='container'></div>

        {/* D UI */}
        <div className='drawer drawer-end'>
          <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content flex flex-col'>
            {/* Navbar */}
            <div className='w-full navbar bg-base-300'>
              <Link to='/' className='font-bold text-lg flex-1 px-2 mx-2'>
                Tick-it
              </Link>

              <div className='flex-none sm:hidden'>
                <label
                  htmlFor='my-drawer-3'
                  aria-label='open sidebar'
                  className='btn btn-square btn-ghost'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    className='inline-block w-6 h-6 stroke-current'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    ></path>
                  </svg>
                </label>
              </div>

              <div className='flex-none hidden sm:block'>
                <ul className='menu menu-horizontal'>
                  <li>
                    <a>Navbar Item 1</a>
                  </li>
                  <li>
                    <a>Navbar Item 2</a>
                  </li>
                </ul>
              </div>

              {loading ? (
                <div>
                  <Loader2 className='animate-spin size-6 mr-4' />
                </div>
              ) : (
                <div className='dropdown dropdown-end mr-4 ml-2'>
                  <button
                    tabIndex={0}
                    role='button'
                    className='flex items-center justify-center'
                  >
                    {user && user.avatarHash ? (
                      <img
                        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatarHash}.webp?size=128`}
                        className='size-6 object-cover rounded-full border'
                      />
                    ) : (
                      <CircleUser className='size-6' />
                    )}
                  </button>

                  <ul
                    tabIndex={0}
                    className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                  >
                    <li>
                      <a
                        onClick={handleLogout}
                        className='flex items-center gap-x-2 hover:text-red-500'
                      >
                        <LogOut className='size-4' /> <span>Sign out</span>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className='drawer-side'>
            <label
              htmlFor='my-drawer-3'
              aria-label='close sidebar'
              className='drawer-overlay'
            ></label>
            <ul className='menu p-4 w-80 min-h-full bg-base-200'>
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
