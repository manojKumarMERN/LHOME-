import Head from 'next/head';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useRouter } from 'next/router';
import ClientOnly from './components/ClientOnly';
import AdminLoginPage from './components/Admin/login'; // Import AdminLoginPage component

const HomePage = dynamic(() => import('./components/NewHomePage'), { ssr: false });

function App() {
  const router = useRouter(); // Initialize router

  const [screenwidth, setWidth] = React.useState(window.innerWidth);
  let hgtt = 0;
  if (window.innerWidth < 600) {
    hgtt = window.innerHeight - 210;
    if (window.innerWidth > 490 && window.innerWidth < 512) {
      hgtt += 10;
    }
  } else {
    hgtt = window.innerHeight - 160;
  }
  const [screenheight, setHeight] = React.useState(hgtt);

  const handleResize = React.useCallback(() => {
    setWidth(window.innerWidth);
    let hgtt = 0;
    if (window.innerWidth < 600) {
      hgtt = window.innerHeight - 210;
      if (window.innerWidth > 490 && window.innerWidth < 512) {
        hgtt += 10;
      }
      if (window.innerWidth > 571 && window.innerWidth < 599) {
        hgtt += 50;
      }
      if (window.innerWidth > 570 && window.innerWidth < 572) {
        hgtt += 45;
      }
      if (window.innerWidth > 509 && window.innerWidth < 571) {
        hgtt += 25;
      }
      if (window.innerWidth > 500 && window.innerWidth < 510) {
        hgtt += 15;
      }
      if (window.innerWidth < 500) {
        hgtt -= 10;
      }
    } else {
      hgtt = window.innerHeight - 160;
    }
    setHeight(hgtt);
  }, []);

  const handleResized = React.useCallback(() => {
    setTimeout(() => {
      handleResize();
    }, 1000);
  }, [handleResize]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResized);
  }, [handleResize, handleResized]);

  React.useEffect(() => {
    setTimeout(() => {
      handleResize();
    }, 500);
  }, [handleResize]);

  const routechanged = (e) => {
    setTimeout(() => {
      handleResize();
    }, 1000);
  };

  // Render AdminLoginPage component if URL is /admin/login, otherwise render HomePage
  const renderPage = () => {
    if (router.pathname === '/admin/adminlogin') {
      return <AdminLoginPage />;
    } else {
      return <HomePage routeChanged={routechanged} screenwidth={screenwidth} screenheight={screenheight} />;
    }
  };

  return (
    <ClientOnly>
      <div className="min-h-full h-screen flex items-center justify-center">
        <div className="w-full min-h-screen grid grid-rows-[min-content_1fr_min-content] ">
          <Head>
            <title>LHome</title>
            <meta name="description" content="" />
            <link rel="icon" href="/assets/icons/favicon.png" />
          </Head>
          {renderPage()}
        </div>
      </div>
    </ClientOnly>
  );
}

export default App;
