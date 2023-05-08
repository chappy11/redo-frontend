import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  FixList,
  ImageView,
  Modal,
  PageContainer,
  TextArea,
} from "../../../../components";
import { useParams } from "react-router-dom";
import { getItem } from "../../../../service/RepubrishItem";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import { addtocart } from "../../../../service/RefubrishCart";
import useGetRefurbrishReview from "../../../../hooks/RefubrishItem/useGetRefurbrishReview";
import { createRefurbrishReview } from "../../../../service/RefurbrishReview";
import { getUserFromStorage } from "../../../../utils/storage.utils";
import useGetRefurbrishRate from "../../../../hooks/RefubrishItem/useGetRefurbrishRate";
import Rating from "../../../../components/Rating";
import { RatingSize } from "../../../../types/RatingSize.enum";
import { createRefurbrishRating } from "../../../../service/RefurbrishRating";

export default function ViewDetails() {
  const { id } = useParams();
  const [data, setData] = useState<any>({});
  const { data: user } = useGetFromStorage();
  const { data: review, sendRequest: handleGetReview } = useGetRefurbrishReview(
    {
      refurbrishItem_id: id ? id : "",
    }
  );
  const {rating} = useGetRefurbrishRate({refurbrishItem_id : id ? id:""})
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alertSuccess, alertError, alertWarning } = useAlertOptions();
  const [isOpenReview, setIsOpenReview] = useState<boolean>(false);
  const [myreview, setMyReview] = useState<string>("");
  const [isOpenRatingModal,setIsOpenRatingModal] = useState<boolean>(false);
  const [myRating,setMyRating] = useState<number>(3);


  const sendRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!id) {
        return;
      }
      const resp = await getItem(id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    sendRequest();
  }, [id]);

  async function handleAddToCart() {
    try {
      if (!user) {
        return;
      }
      const payload = {
        id,
        user_id: user?.user_id,
        seller_id: data?.user_id,
      };

      const resp = await addtocart(payload);
      if (resp.data.status === 1) {
        alertSuccess(resp.data.message);
        return;
      }
      alertWarning(resp.data.message);
    } catch (error) {
      alertError();
    }
  }

  const displayFix = useMemo(() => {
    if (!id) {
      return;
    }

    return (
      <FixList repubrishItem_id={data.repubrishItem_id} refetch={isLoading} />
    );
  }, [data.repubrishItem_id, id, isLoading]);

  const getReviews = useMemo(() => {
    return review.map((val, i) => (
      <div key={i.toString()} className=" border-b border-b-slate-100">
        <h1 className=" font-bold">{val.fullname}</h1>
        <div className=" p-4">
          <p>{val.review}</p>
        </div>
      </div>
    ));
  }, [review]);

  async function handleCreateReview() {
    try {
      if (!myreview) {
        alertWarning("Please put your review ");
        return;
      }
      const user = await getUserFromStorage();
      const payload = {
        review: myreview,
        user_id: user.user_id,
        refubrishItem_id: id,
      };

      const resp = await createRefurbrishReview(payload);

      if (resp.data.status == 0) {
        alertError();
      }
      handleGetReview(id ? id : "");
      setIsOpenReview(false);
      alertSuccess(resp.data.message);
    } catch (error) {}
  }

  const handleChangeRating = useCallback(
    async() => {
      try {
        const payload = {
          rate:myRating,
          item_id:id,
          user_id:user?.user_id
        }
        const resp = await createRefurbrishRating(payload);   

        if(resp.data.status == 1){
          alertSuccess(resp.data.message);
          setIsOpenRatingModal(false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    [id, myRating, user?.user_id],
  )
  
  return (
    <PageContainer>
      <div className=" mx-5 md:m-auto lg:m-auto md:w-3/4 lg:w-3/4">
        <Modal
          showModal={isOpenReview}
          header="Review"
          setShowModal={setIsOpenReview}
          onConfirm={handleCreateReview}
          onCancel={() => setIsOpenReview(false)}
        >
          <TextArea
            placeholder="Write your review here..."
            onChange={(e) => setMyReview(e.target.value)}
          />
        </Modal>
        <Modal
          showModal={isOpenRatingModal}
          header="Rate This Item"
          setShowModal={setIsOpenRatingModal}
          onConfirm={handleChangeRating}
          onCancel={()=>{}}
        >
          <div className=" flex justify-center">
            <Rating rate={myRating} setRate={setMyRating} size={RatingSize.LARGE}/>
          </div>
        </Modal>
        <h1 className=" text-xl font-bold mb-5">Refurbrish Device Details</h1>
        <div className=" bg-white p-5 w-full shadow-lg">
          <div className=" flex flex-col md:flex-row lg:flex-row">
            <div className=" flex-1 flex justify-center">
              <ImageView
                pic1={data?.rpic1}
                pic2={data?.rpic2}
                pic3={data?.rpic3}
              />
            </div>
            <div className=" flex-1">
              <h1 className=" text-lg font-bold">
                {data?.rdevice_name} ({data?.rdeviceBrand})
              </h1>
              <p className=" text-sm text-secondary">{data?.rdevice_type}</p>
              <div onClick={()=>setIsOpenRatingModal(true)}>
                <Rating rate={rating} size={RatingSize.MEDIUM}/>
              </div>
              <p className=" mt-4 text-red-400 font-bold">
                PHP {data?.selling_price}
              </p>
              <div className=" mt-5">
                <p className=" text-sm font-bold">Device Issue/Description</p>
                <p className=" mx-3 text-sm mt-2">
                  {data?.rdevice_description}
                </p>
              </div>
              <div className=" flex w-full justify-end mt-5">
                <Button onClick={handleAddToCart}>Add to Cart</Button>
              </div>
              <div className=" mt-5">
                <div className=" flex mb-5">
                  <p className=" font-bold">Device Fix:</p>
                </div>
              </div>
              {displayFix}
            </div>
          </div>
        </div>
        <div className=" h-5" />
        <div className=" bg-white shadow-lg p-4">
          <p className=" font-bold text-xl mb-3">Reviews</p>
          {getReviews}
          <div className=" flex mt-3 justify-end">
            <Button onClick={() => setIsOpenReview(true)}>Review</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
