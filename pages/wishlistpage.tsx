import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as config from "../next.config";
import "react-multi-carousel/lib/styles.css";
import PageHeader from "./components/PageHeader";
import css from "../styles/wishlistpage.module.scss";
import { AxiosService } from '../services/ApiService';
import { getToken } from '../services/sessionProvider';
import { BsHeartFill } from "react-icons/bs";
import { toast } from 'react-toastify';

const Wishlistpage: React.FC = () => {
  const [screenwidth, setWidth] = useState(0);
  const [screenheight, setHeight] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  const router = useRouter();

  const handleWishlistClick = () => {
    router.push('/wishlistpage');
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
    let hgtt = window.innerWidth < 600 ? window.innerHeight - 210 : window.innerHeight - 160;

    if (window.innerWidth > 490 && window.innerWidth < 512) {
      hgtt += 10;
    } else if (window.innerWidth > 571 && window.innerWidth < 599) {
      hgtt += 50;
    } else if (window.innerWidth > 570 && window.innerWidth < 572) {
      hgtt += 45;
    } else if (window.innerWidth > 509 && window.innerWidth < 571) {
      hgtt += 25;
    } else if (window.innerWidth > 500 && window.innerWidth < 510) {
      hgtt += 15;
    } else if (window.innerWidth < 500) {
      hgtt -= 10;
    }

    setHeight(hgtt);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const token = getToken();
      const response = await AxiosService.get('/products/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistItems(response.data.cartItems);
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const handleRemoveFromWishlist = async (id: number) => {
    try {
      const token = getToken();
      const response = await AxiosService.delete(`/products/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast('Product removed from wishlist');
        fetchWishlistItems(); // Refresh wishlist items
      } else {
        toast('Failed to remove product. Please try again.');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      toast('Failed to remove product. Please try again.');
    }
  };

  return (
    <React.Fragment>
      <div className="animate-fade-in">
        <div className={css.lhomePage}>
          <PageHeader 
            screenwidth={screenwidth} 
            screenheight={screenheight} 
            assetpath={config.assetPrefix} 
            hidden={false} 
          />
          <div className={css.nodesign}>
            <p>home / My Wishlist</p>
          </div>
          <div className={css.wishlistInnerLayer}>
            <div className={css.wishlistInnerContent}>
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => (
                  <div key={item.id} className={css.wishlistItem}>
                    <div className={css.imageContainer}>
                      <img src={item.product.image} alt={item.name} />
                      <BsHeartFill 
                        className={css.heartIcon} 
                        onClick={() => handleRemoveFromWishlist(item.product.id)}
                      />
                    </div>
                    <div>{item.name}</div>
                  </div>
                ))
              ) : (
                <div>
                  <div className={css.wishlistTextIcons}>
                    <img loading="lazy" className={css.wishlisticonChanges} src={`${config.assetPrefix}/assets/wishlist.png`} alt="wishlist" />
                  </div>
                  <div className={css.wishlistHeader}>No Design Found</div>
                  <div className={css.wishlistSubText}>Browse Designs</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Wishlistpage;


// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import * as config from "../next.config";
// import "react-multi-carousel/lib/styles.css";
// import PageHeader from "./components/PageHeader";
// import css from "../styles/wishlistpage.module.scss";
// import { AxiosService } from '../services/ApiService';
// import { getToken } from '../services/sessionProvider';

// const Wishlistpage: React.FC = () => {
//   const [screenwidth, setWidth] = useState(0);
//   const [screenheight, setHeight] = useState(0);
//   const [wishlistItems, setWishlistItems] = useState<any[]>([]);

//   const router = useRouter();

//   const handleWishlistClick = () => {
//     router.push('/wishlistpage');
//   };

//   const handleResize = () => {
//     setWidth(window.innerWidth);
//     let hgtt = window.innerWidth < 600 ? window.innerHeight - 210 : window.innerHeight - 160;

//     if (window.innerWidth > 490 && window.innerWidth < 512) {
//       hgtt += 10;
//     } else if (window.innerWidth > 571 && window.innerWidth < 599) {
//       hgtt += 50;
//     } else if (window.innerWidth > 570 && window.innerWidth < 572) {
//       hgtt += 45;
//     } else if (window.innerWidth > 509 && window.innerWidth < 571) {
//       hgtt += 25;
//     } else if (window.innerWidth > 500 && window.innerWidth < 510) {
//       hgtt += 15;
//     } else if (window.innerWidth < 500) {
//       hgtt -= 10;
//     }

//     setHeight(hgtt);
//   };

//   useEffect(() => {
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AxiosService.get('/products/wishlist');
//         setWishlistItems(response.data.cartItems);
//       } catch (error) {
//         console.error('Error fetching wishlist data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <React.Fragment>
//       <div className="animate-fade-in">
//         <div className={css.lhomePage}>
//           <PageHeader 
//             screenwidth={screenwidth} 
//             screenheight={screenheight} 
//             assetpath={config.assetPrefix} 
//             hidden={false} 
//           />
//           <div className={css.nodesign}>
//             <p>home / My Wishlist</p>
//           </div>
//           <div className={css.wishlistInnerLayer}>
//             <div className={css.wishlistInnerContent}>
//               {wishlistItems.length > 0 ? (
//                 wishlistItems.map((item) => (
//                   <div key={item.id} className={css.wishlistItem}>
//                     <img src={item.product.image} alt={item.name} />
                    
//                     <div>{item.name}</div>
//                   </div>
//                 ))
//               ) : (
//                 <div>
//                   <div className={css.wishlistTextIcons}>
//                     <img loading="lazy" className={css.wishlisticonChanges} src={`${config.assetPrefix}/assets/wishlist.png`} alt="wishlist" />
//                   </div>
//                   <div className={css.wishlistHeader}>No Design Found</div>
//                   <div className={css.wishlistSubText}>Browse Designs</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Wishlistpage;
