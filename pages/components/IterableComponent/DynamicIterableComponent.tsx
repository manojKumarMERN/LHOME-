import React from 'react';
import css from "./DynamicIterableComponent.module.scss";
import Modal from 'react-bootstrap/Modal';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { AiFillCloseCircle } from 'react-icons/ai';
import DetailsOfimg from '../../DetailsOfimg';
import { AxiosService } from '../../../services/ApiService';
import { getToken } from '../../../services/sessionProvider';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Share from '../../Share';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { RootState } from "../../../store";

interface DataItem {
  id: number;
  name: string;
  image?: string;
  size?: string;
  icon?: string;
  content?: string;
  btn?: string;
  liked?: boolean;
}

interface Properties {
  data: DataItem[];
  categoryId: string;
}

const DynamicIterableComponent: React.FC<Properties> = ({ data = [], categoryId }) => {
  const [show, setShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<DataItem | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [res, setRes] = React.useState<DataItem[]>([]);
  const [shareShow, setShareShow] = React.useState(false);
  const [likedStatus, setLikedStatus] = React.useState<{ [key: number]: boolean }>({});
  const isLoggedIn = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const response = await AxiosService.get(`/products/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const wishlistItems = Array.isArray(response.data?.cartItems) ? response.data.cartItems : [];
        setRes(wishlistItems);

        // Update likedStatus based on the fetched wishlist items
        const likedStatusMap: { [key: number]: boolean } = {};
        wishlistItems.forEach(item => {
          likedStatusMap[item.product.id] = true;
        });
        setLikedStatus(likedStatusMap);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [categoryId, show]);

  const handleLike = async (id: number) => {
    const auth = getToken();
    if (!auth) {
      toast('Please login to use this feature');
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        toast('Unauthorized. Please login again.');
        return;
      }

      const liked = likedStatus[id] || false;
      let response;
      if (liked) {
        response = await AxiosService.delete(`/products/wishlist/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await AxiosService.put(`/products/wishlist/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.status === 200) {
        setLikedStatus(prevLikedStatus => ({
          ...prevLikedStatus,
          [id]: !liked,
        }));
        toast(liked ? 'Product unliked successfully' : 'Product liked successfully');
      } else {
        toast('Failed to change like status. Please try again.');
      }
    } catch (error) {
      console.error('Request failed:', error);
      toast('Failed to change like status. Please try again.');
    }
  };

  const updatedData = data.map((element) => {
    return { ...element, liked: likedStatus[element.id] || false };
  });

  const handlePopup = (item: DataItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShareShow = () => {
    setShareShow(true);
  };

  const handleShareClose = () => {
    setShareShow(false);
  };

  const handleImageClick = (item: DataItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  return (
    <React.Fragment>
      <div className="w-full">
        <div className={"container-fluid " + css.mainBlock}>
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
            {updatedData.length > 0 ? (
              updatedData.map((item, index) => (
                <div className={"p-3 w-full h-full " + css.divCard} key={item.id}>
                  {item.image ? (
                    <div className={css.customdivisionchild}>
                      <div className={css.customimage}>
                        <LazyLoadImage
                          src={item.image}
                          alt="images"
                          onClick={() => handlePopup(item, index)}
                        />
                        <div className={"w-full flex grid-cols-5"} style={{ padding: "2% 0 3%" }}>
                          <div className="w-full col-span-3" onClick={() => handlePopup(item, index)}>
                            <span className={css.customname + " sm:text-[8px] md:text-[12px]"}>{item.name}</span>
                            <span className={css.customtext}>{item.size}</span>
                          </div>
                          <div className={css.dynamicIcons_content}>
                            <div className={'col-span-1 ' + css.com_icons}>
                              <span className={css.wishlistholder}>
                                <div onClick={() => handleLike(item.id)}>
                                  {item.liked ? <BsHeartFill style={{ color: '#F44336' }} /> : <BsHeart />}
                                </div>
                              </span>
                            </div>
                            <div className={'col-span-1 ' + css.com_icons}>
                              <span className={css.shareholder}>
                                <FaRegShareFromSquare onClick={handleShareShow} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={css.customdivisionchild}>
                      <div className={css.customGrey + " grid grid-rows-3"}>
                        <div className="flex flex-column gap-2 items-center">
                          <div className={css.custom_icons}>
                            <img src={item.icon} alt="icon" className={css.icon_image} />
                          </div>
                          <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-8">
                              <p
                                className={css.content}
                                dangerouslySetInnerHTML={{ __html: item.content }}
                              ></p>
                            </div>
                            <div className="col-lg-2"></div>
                          </div>
                        </div>
                        <div className="flex w-full justify-center">
                          {item.btn && <Link href="/GetfreeEstimate" className={css.btnStyle + " no-underline"}>{item.btn}</Link>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>No items available</div>
            )}
            <Modal show={show} onHide={handleClose} className={css.Modal_Popup}>
              <Modal.Header>
                <AiFillCloseCircle onClick={handleClose} />
              </Modal.Header>
              {selectedItem && (
                <DetailsOfimg
                  data={data}
                  selectedItem={selectedItem}
                  index={selectedIndex}
                  categoryId={categoryId}
                  handleImageClick={handleImageClick}
                />
              )}
            </Modal>
            <Modal show={shareShow} onHide={handleShareClose} className={css.share_Modal}>
              <Modal.Header>
                Share<AiFillCloseCircle onClick={handleShareClose} />
              </Modal.Header>
              <Share />
            </Modal>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DynamicIterableComponent;
