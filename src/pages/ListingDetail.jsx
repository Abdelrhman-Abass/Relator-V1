import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase.config";
import { Spinner } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay, Pagination,Mousewheel, Keyboard } from 'swiper/modules';
import {FaShare} from 'react-icons/fa'

import "swiper/css/bundle";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const ListingDetail = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        // console.log(listing);
      }
    }
    fetchListing();
  }, [params.listingID]);

  if (loading) {
    return <Spinner />;
  }
  console.log(listing.imgUrls[0])

  return (
    <main>
      <Swiper
        slidesPerView={1}
        loop={true}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay,Navigation, Pagination, Mousewheel, Keyboard]}
      >
        {listing.imgUrls.map((url, index) => (

          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[500px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
          ))}
      </Swiper>
      <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
      onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setShareLink(true)
        setTimeout(()=>{setShareLink(false)},2000)
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLink &&(
        <p className="fixed top-[18%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">Copied!</p>
      )}
    </main>
  );
};

export default ListingDetail;
