import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase.config";
import { Spinner } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay, Pagination,Mousewheel, Keyboard } from 'swiper/modules';
import {FaShare ,FaMapMarkerAlt ,FaBed,FaBath,FaParking,FaChair } from 'react-icons/fa'

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
              className="relative w-full overflow-hidden h-[450px]"
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

      <div className="m-4 flex flex-col md:flex-row max-w-5xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white">
        <div className=" w-full h-[200px] lg-[400px] rounded-lg">
          <p className="text-2xl font-bold mb-3  text-blue-900 ">{listing.name } - $ {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {listing.type === "rent" && " / month"}
                  </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1"/>
            {listing.address}</p> 

          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {/* {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )} */}
          {/* {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )} */}
        </div>
      </div>
      
    </main>
  );
};

export default ListingDetail;

