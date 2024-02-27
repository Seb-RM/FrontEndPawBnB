import React from "react";
import Cards from "../../Components/Cards/Cards";
import Filter from "../../Components/Filter/Filter";
import { useEffect } from "react";
import { addDogsister, addAllReview } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./Home.module.css";
import { useParams } from "react-router-dom";
import FormReview from "../../Components/FormReview/FormReview";

const Home = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //const completedProfile = useSelector((state) => state.sitter.completedProfile)


  useEffect(() => {
    const dogsisterAsync = async () => {
      try {
        const { data } = await axios.get("https://backendpawbnb-production.up.railway.app/sitters");
        dispatch(addDogsister(data));
      } catch (error) {
        console.error('Error fetching dogsisters:', error);
      }
    }

    const reviewAsync = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/review`);
        dispatch(addAllReview(data));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    reviewAsync();
    dogsisterAsync();

  }, [])

  return (
    <div>
      <div className={style.homeContainer}>
        <FormReview dogSitterId='49a42f96-c59f-4313-8290-6936d4a69370' 
        ownerId='4b0e5f84-9587-4051-afe0-4b70b0f5741f'/>
        <Filter/>
        <Cards/>
      </div >
    </div>
  );
};

export default Home;
