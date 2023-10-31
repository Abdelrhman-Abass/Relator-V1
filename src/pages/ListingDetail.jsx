import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase.config";
import { Spinner } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay, Pagination,Mousewheel, Keyboard } from 'swiper/modules';
// import { EffectFade } from 'swiper/modules';
import "swiper/css/bundle";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const ListingDetail = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
    </main>
  );
};

export default ListingDetail;
